/* WEB DISK */

/*
 * A simple http server, provide basic authenticated function and return resources
 * ONLY handle GET method and HEADER method
 */

import * as event from 'events';
import * as net   from 'net';
import * as http  from 'http';
import * as fs    from 'fs';
import * as path  from 'path';
import * as utilx from 'util';

import { URL }       from 'url';

import * as util     from './utils';
import { constants } from './constants';
import { upgradeHandler } from './message_gateway';

import { debug, info, warn, error } from './logger';
import { DB } from './services';

import * as annautils from 'annautils';
import { cons } from './utils';
import { UserInfo } from './common/db_types';


/**
 * @class HttpServer delegate of underlying http server
 * @event request
 * @event upgrade
 * @event listening
 * @event close
 * @event error
 */
export class HttpServer extends event.EventEmitter
{
    private httpServer: http.Server;

    /**
     * @param {string} configFile a json file that specify configuration of this server, such as users information
     */
    constructor () //{
    {
        super();
        this.httpServer = new http.Server();

        this.httpServer.on("request", (req, res) => this.emit("request", req, res));
        this.httpServer.on("upgrade", (inc, sock, buf) => this.emit("upgrade", inc, sock, buf));
        this.httpServer.on("close", ()  => this.emit("close"));
        this.httpServer.on("error", err => this.emit("error", err));
        this.httpServer.on("listening", () => this.emit("listening"));

        this.on("request", this.onrequest);
        this.on("upgrade", this.onupgrade);
    } //}

    /** response client with nothing, default status code is 405, methold not allow */
    private write_empty_response(res: http.ServerResponse, sc: number = 405) //{
    {
        res.statusCode = sc;
        res.end();
    } //}

    /** 
     * response a file or partial file that is in server to client, 
     * if whole file status code is [200 OK], if partial file status code is [206 partial content]
     * @param { string } filename file path
     * @param { ServerResponse } res response stream
     * @param { boolean } header if true just response with HTTP header
     * @param { [number, number] } range range of file, null represent whole file
     */
    private async write_file_response(filename: string, res: http.ServerResponse, header: boolean, range: [number, number],
                                      attachment: boolean = false) //{
    {
        if (path == null) {
            res.statusCode = 500;
            res.end("<h1>Internal Server Error</h1>");
        }
        let success: number = 200;
        if (range) success = 206;
        try {
            let astat = utilx.promisify(fs.stat);
            let filestat = await astat(filename);
            if (!filestat.isFile)
                throw new Error("file doesn't exist");
            if (range != null && filestat.size <= range[1]) 
                throw new Error("request range is out of the file");

            if(attachment) {
                const bname = path.basename(filename);
                let attachment = `attachment; filename*=UTF-8''${encodeURI(bname)}`;
                res.setHeader('Content-Disposition', attachment);
            }

            let content_length: number;
            let startposition: number;
            if (range == null) {
                content_length = filestat.size;
                startposition = 0;
            } else if (range[1] == -1) {
                content_length = filestat.size - range[0];
                startposition = range[0];
            } else {
                content_length = range[1] - range[0] + 1;
                startposition = range[0];
            }
            res.setHeader("Accept-Ranges", "bytes");
            res.setHeader("Content-Length", content_length);
            let file_extension: string = path.extname(filename);
            let content_type: string   = constants.FILE_TYPE_MAP.get(file_extension) || constants.FILE_TYPE_MAP.get("unknown");
            res.setHeader("Content-Type", content_type);
            res.setHeader("Last-Modified", filestat.mtime.toUTCString());
            if(range != null) {
                if (range[1] != -1)
                    res.setHeader("Content-Range", `bytes ${range[0]}-${range[1]}/${filestat.size}`);
                else
                    res.setHeader("Content-Range", `bytes ${range[0]}-${filestat.size - 1}/${filestat.size}`);
            }
            res.statusCode = success;
            if (header) {
                res.end();
                return;
            }
            fs.open(filename, "r", (err, fd) => {
                if (err) {
                    res.writeHead(500);
                    return res.end();
                }
                res.writeHead(success);
                annautils.stream.fdWriteToWritable(fd, startposition, res, content_length, 1024, false, (err, nbytes) => {
                    if (err != null) {
                        res.statusCode = 500;
                        return res.end();
                    }
                    res.end();
                });
            });
        } catch (err) {
            res.statusCode = 404;
            res.end(`<h1>${err}</h1>`);
            return;
        }
    } //}

    /** default listener of request event */
    protected onrequest(request: http.IncomingMessage, response: http.ServerResponse) //{
    {
        response.setHeader("Server", cons.ServerName);
        let url = new URL(request.url, `http:\/\/${request.headers.host}`);
        if (request.method.toLowerCase() != "get" && request.method.toLowerCase() != "header") {
            response.statusCode = 405;
            response.setHeader("Connection", "close");
            response.end();
        }
        const header: boolean = request.method.toLowerCase() == "header";
        const range = util.parseRangeField(request.headers.range);

        if(url.pathname.startsWith(cons.DiskPrefix)) {
            const token = url.searchParams.get(cons.DownloadTokenName);
            const stoken = url.searchParams.get(cons.DownloadShortTermTokenName);
            if (token == null && stoken == null) {
                return this.write_empty_response(response, 401);
            }
            const download = (uinfo: UserInfo) => {
                if (uinfo == null) {
                    return this.write_empty_response(response, 401);
                }
                let fileName = path.resolve(uinfo.rootPath, decodeURI(url.pathname.substring(cons.DiskPrefix.length + 1)));
                let range: [number, number] = util.parseRangeField(request.headers.range);
                this.write_file_response(fileName, response, header, range);
            };
            if (!!token) {
                DB.getUserInfo(token).then(userinfo => download(userinfo));
            } else {
                DB.UserInfoByShortTermToken(stoken).then(userinfo => download(userinfo));
            }
        } else if (url.pathname.startsWith(cons.NamedLinkPREFIX)) {
            let namedlink = url.pathname.substr(cons.NamedLinkPREFIX.length);
            if(namedlink.startsWith('/')) namedlink = namedlink.substr(1);
            this.responseNamedLink(response, namedlink, header, range);
        } else {
            if(url.pathname == '/') url.pathname = '/index.html';
            let filename  = path.resolve(constants.WebResourceRoot, url.pathname.substring(1));
            let indexfile = path.resolve(constants.WebResourceRoot, 'index.html');

            this.responseNonPriviledgedFile(response, filename, indexfile, header, range);
        }
    } //}

    private async responseNonPriviledgedFile(response: http.ServerResponse, 
                                             filename: string, indexfile: string, 
                                             header: boolean, range: [number,number]) //{
    {
        let ansfile = filename;
        try {
            const stat = await fs.promises.stat(filename);
            if (!stat.isFile && !stat.isSymbolicLink) {
                ansfile = indexfile;
            }
        } catch {
            ansfile = indexfile;
        }
        return await this.write_file_response(ansfile, response, header, range);
    } //}

    private async responseNamedLink(response: http.ServerResponse,
                                    namedlink: string, header: boolean, range: [number,number]) //{
    {
        try {
            const user = await DB.queryValidNameEntry(namedlink);
            const filename = path.resolve(user.userinfo.rootPath, user.destination.substr(1));
            await this.write_file_response(filename, response, header, range, true);
        } catch (err) {
            console.error(err);
            response.statusCode = 405;
            response.setHeader("Connection", "close");
            response.end();
        }
    } //}

    /** default listener of request event */
    protected onupgrade(inc: http.IncomingMessage, socket: net.Socket, buf: Buffer) //{
    {
        upgradeHandler(inc, socket, buf);
    } //}

    /** listen */
    public listen(port: number, addr: string) //{
    {
        this.httpServer.listen(port, addr);
    } //}
}

