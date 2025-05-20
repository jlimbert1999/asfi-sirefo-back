import { UserRole } from 'src/modules/users/domain';

export interface Menu {
  role?: UserRole;
  label: string;
  icon?: string;
  routerLink?: string;
  items?: Menu[];
}

export const FRONTEND_MENU: Menu[] = [
  {
    label: 'Administracion',
    items: [
      {
        role: UserRole.ADMIN,
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: 'admin/users',
      },
    ],
  },
  {
    label: 'Documentacion',
    items: [
      {
        icon: 'pi pi-list-check',
        role: UserRole.EMPLOYEE,
        label: 'Metodos',
        routerLink: 'home/methods',
      },
      // {
      //   icon: 'pi pi-building',
      //   role: UserRole.EMPLOYEE,
      //   label: 'Entidades vigentes',
      //   routerLink: 'home/entities',
      // },
    ],
  },
  {
    label: 'Administracion',
    items: [
      {
        icon: 'pi pi-file-check',
        role: UserRole.EMPLOYEE,
        label: 'Retencion / Suspension',
        routerLink: 'home/asfi-request',
      },
      {
        icon: 'pi pi-file-export',
        role: UserRole.EMPLOYEE,
        label: 'Remisiones de fondos',
        routerLink: 'home/asfi-fund-transfer',
      },
      {
        icon: 'pi pi-list',
        role: UserRole.EMPLOYEE,
        label: 'Listado de envios',
        routerLink: 'home/request-list',
      },
    ],
  },
];
