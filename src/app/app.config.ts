import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  LucideAngularModule,
  File,
  Home,
  Menu,
  UserCheck,
  BellDot,
  ChevronDown,
  BarChart,
  FileText,
  Image,
  HandCoins,
  LayoutDashboard,
  MessageSquareMore,
  CircleHelp,
  Settings,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Monitor,
  Expand,
  Notebook,
  Printer,
} from 'lucide-angular';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      LucideAngularModule.pick({
        File,
        Home,
        Menu,
        UserCheck,
        BellDot,
        ChevronDown,
        BarChart,
        FileText,
        Image,
        HandCoins,
        LayoutDashboard,
        MessageSquareMore,
        CircleHelp,
        Settings,
        Search,
        SlidersHorizontal,
        Pencil,
        Trash2,
        ArrowLeft,
        ArrowRight,
        Monitor,
        Expand,
        Notebook,
        Printer,
      })
    ),
  ],
};
