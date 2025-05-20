import { ItemRequestDto } from '../../dtos';

export interface IAsfiRequestProps {
  id: number;
  authorityPosition: string;
  requestingAuthority: string;
  requestCode: string;
  department: string;
  processType: 'S' | 'R';
  quantityDetail: number;
  sentDate: Date;
  userName: string;
  fileName: string;
  details: ItemRequestDto[];
}
