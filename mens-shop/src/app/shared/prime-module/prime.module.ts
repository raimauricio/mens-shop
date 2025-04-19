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
    SplitButtonModule
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
    SplitButtonModule
  ],
  declarations: []
})
export class PrimeModule { }
