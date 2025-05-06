import { BadgeModule } from 'primeng/badge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { TimelineModule } from 'primeng/timeline';
import { AccordionModule } from 'primeng/accordion';
import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    CarouselModule,
    TagModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    CheckboxModule,
    ToolbarModule,
    SplitButtonModule,
    BadgeModule,
    RadioButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MenuModule,
    MessagesModule,
    AccordionModule,
    TimelineModule
  ],
  exports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    CarouselModule,
    TagModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    CheckboxModule,
    ToolbarModule,
    SplitButtonModule,
    BadgeModule,
    RadioButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MenuModule,
    MessagesModule,
    AccordionModule,
    TimelineModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  declarations: []
})
export class PrimeModule { }
