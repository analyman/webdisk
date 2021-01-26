import { FileStat } from 'src/app/shared/common';
import { FileViewerService } from './file-viewer.service';

export default async(fileviewservice: FileViewerService, file: FileStat): Promise<void> => {
    await fileviewservice.openfile.createVideo({
        src: await fileviewservice.ValidHttpResourceURL(file.filename)
    }).wait();
}

