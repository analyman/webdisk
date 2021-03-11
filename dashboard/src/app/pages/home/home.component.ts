import { Component, OnInit, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FileStat, FileType } from 'src/app/shared/common';
import { FileSystemManagerService } from 'src/app/shared/service/file-system-manager.service';
import { InjectViewService } from 'src/app/shared/service/inject-view.service';
import { KeyboardPressService, Keycode } from 'src/app/shared/service/keyboard-press.service';
import { Subscription } from 'rxjs';
import { CurrentDirectoryService } from 'src/app/shared/service/current-directory.service';
import { AccountManagerService } from 'src/app/shared/service/account-manager.service';
import { cons, downloadURI, Life } from 'src/app/shared/utils';
import { MenuEntry, RightMenuManagerService } from 'src/app/shared/service/right-menu-manager.service';
import { MessageBoxService } from 'src/app/shared/service/message-box.service';
import { NotifierService } from 'src/app/shared/service/notifier.service';
import { MousePointerService } from 'src/app/shared/service/mouse-pointer.service';
import { MessageProgressBarService } from 'src/app/shared/service/message-progress-bar.service';
import { OpenSystemChooseFilesService } from 'src/app/shared/service/open-system-choose-files.service';
import { Tool, ToolbarService, ToolType } from './file-view/toolbar.service';
import { LeftPanelService } from './left-panel.service';
import { DirectoryTreeComponent } from './directory-tree/directory-tree.component';

declare const require: any;
const test = require('src/assets/wasm/test.wasm');
console.log(test);
window['yoxi'] = test;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(private contextmenu: RightMenuManagerService,
                private cwd: CurrentDirectoryService,
                private notifier: NotifierService,
                private mousepointer: MousePointerService,
                private messagebox: MessageBoxService,
                private selectfiles: OpenSystemChooseFilesService,
                private toolbar: ToolbarService,
                private leftpanelservice: LeftPanelService,
                private messageprogress: MessageProgressBarService) {
        this.contextmenu.StartContextMenu();
        this.mousepointer.coordinate;
    }

    ngOnDestroy(): void {
        this.life.die();
    }

    private life: Life = new Life();
    @ViewChild('panel', {static: true})
    private leftpanel: ElementRef;

    @ViewChild('tree', {static: true})
    private dir_tree: DirectoryTreeComponent;

    ngOnInit(): void {
        this.leftpanelservice.initialize(this.leftpanel.nativeElement);
        const panelToggle = new Tool('Panel', 'menu', false, () => {
            this.leftpanelservice.toggle();
        });
        panelToggle.cssclass = 'panel-button';
        this.toolbar.register(ToolType.Navigation, panelToggle, this.life);

        this.dir_tree.onGet();
    }
}

