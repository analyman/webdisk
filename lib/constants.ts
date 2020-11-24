import * as path from 'path';

export module constants {
    export const rootdir = path.dirname(path.dirname(__filename));

    export const WebResourceRoot = path.join(rootdir, "docroot");
    export const CONFIG_PATH     = path.join(rootdir, "etc", "webdisk.json");

    export const ServerName          = 'webdisk/0.0.1';
    export const DISK_PREFIX: string = "/disk";

    export const NEW_FILE_PREFIX      = 'newfile';
    export const NEW_FOLDER_PREFIX    = 'newfolder';
    export const MAX_NEW_EXISTS       = 100;
    export const TEMP_FILE_ENTRY_NAME = 'accepts';

    export const FILE_TYPE_MAP = new Map<string, string>([
        [".aac",    "audio/aac"],
        [".abw",    "application/x-abiword"],
        [".arc",    "application/x-freearc"],
        [".avi",    "video/x-msvideo"],
        [".azw",    "application/vnd.amazon.ebook"],
        [".bin",    "application/octet-stream"],
        [".bmp",    "image/bmp"],
        [".bz",     "application/x-bzip"],
        [".bz2",    "application/x-bzip2"],
        [".csh",    "application/x-csh"],
        [".css",    "text/css"],
        [".csv",    "text/csv"],
        [".doc",    "application/msword"],
        [".docx",   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        [".eot",    "application/vnd.ms-fontobject"],
        [".epub",   "application/epub+zip"],
        [".gz",     "application/gzip"],
        [".gif",    "image/gif"],
        [".htm",    "text/html"],
        [".html",   "text/html"],
        [".ico",    "image/vnd.microsoft.icon"],
        [".ics",    "text/calendar"],
        [".jar",    "application/java-archive"],
        [".jpg",    "image/jpeg"],
        [".jpeg",   "image/jpeg"],
        [".js",     "text/javascript"],
        [".json",   "application/json"],
        [".jsonld", "application/ld+json"],
        [".mid",    "audio/x-midi"],
        [".midi",   "audio/x-midi"],
        [".mjs",    "text/javascript"],
        [".mp3",    "audio/mpeg"],
        [".mpeg",   "video/mpeg"],
        [".mpkg",   "application/vnd.apple.installer+xml"],
        [".odp",    "application/vnd.oasis.opendocument.presentation"],
        [".ods",    "application/vnd.oasis.opendocument.spreadsheet"],
        [".odt",    "application/vnd.oasis.opendocument.text"],
        [".oga",    "audio/ogg"],
        [".ogv",    "video/ogg"],
        [".ogx",    "application/ogg"],
        [".opus",   "audio/opus"],
        [".otf",    "font/otf"],
        [".png",    "image/png"],
        [".pdf",    "application/pdf"],
        [".php",    "application/php"],
        [".ppt",    "application/vnd.ms-powerpoint"],
        [".pptx",   "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
        [".rar",    "application/vnd.rar"],
        [".rtf",    "application/rtf"],
        [".sh",     "application/x-sh"],
        [".svg",    "image/svg+xml"],
        [".swf",    "application/x-shockwave-flash"],
        [".tar",    "application/x-tar"],
        [".tif",    "image/tiff"],
        [".tiff",   "image/tiff"],
        [".ts",     "video/mp2t"],
        [".ttf",    "font/ttf"],
        [".txt",    "text/plain"],
        [".vsd",    "application/vnd.visio"],
        [".wav",    "audio/wav"],
        [".weba",   "audio/webm"],
        [".webm",   "video/webm"],
        [".webp",   "image/webp"],
        [".woff",   "font/woff"],
        [".woff2",  "font/woff2"],
        [".xhtml",  "application/xhtml+xml"],
        [".xls",    "application/vnd.ms-excel"],
        [".xlsx",   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        [".xml",    "application/xml"],
        [".xul",    "application/.vndmozilla.xul+xml"],
        [".zip",    "application/zip"],
        [".3gp",    "video/3gpp"],
        [".3g2",    "video/3gpp2"],
        [".7z",     "application/x-7z-compressed"],
        ["unknown", "application/octet-stream"]
    ]);

    export const SHORT_TERM_TOKEN_QUERY_PARAM = 'token';
}

