import { NgModule } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password'
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { GalleriaModule } from 'primeng/galleria';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DockModule } from 'primeng/dock';
import { DataViewModule } from 'primeng/dataview';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollerModule } from 'primeng/scroller';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { ChipModule } from 'primeng/chip';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SidebarModule } from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TimelineModule } from 'primeng/timeline';
import { TabMenuModule } from 'primeng/tabmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import {ColorPickerModule} from 'primeng/colorpicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputOtpModule } from 'primeng/inputotp';
import { ChartModule } from 'primeng/chart';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  exports: [
    InputOtpModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    MegaMenuModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    TableModule,
    MultiSelectModule, DropdownModule,
    CalendarModule,
    TabViewModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    PasswordModule,
    DialogModule,
    StepsModule,
    ToastModule,
    TooltipModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    BadgeModule,
    InputNumberModule,
    GalleriaModule,
    BreadcrumbModule,
    InputSwitchModule,
    OverlayPanelModule,
    DockModule,
    DataViewModule,
    SlideMenuModule,
    ImageModule,
    SkeletonModule,
    ProgressSpinnerModule,
    VirtualScrollerModule,
    ScrollerModule,
    MenuModule,
    // MenuItem,
    TreeModule,
    ChipModule,
    ListboxModule,
    PanelModule,
    ConfirmPopupModule,
    SidebarModule,
    AutoCompleteModule,
    TimelineModule,
    TabMenuModule,
    SelectButtonModule,
    ColorPickerModule,
    FloatLabelModule,
    ChartModule,
    FileUploadModule,
    PanelMenuModule,
    StepsModule
  ],
  imports:[
    FileUploadModule
  ],
  providers:[
    ConfirmationService, MessageService
  ]
})
export class PrimengModule { }
