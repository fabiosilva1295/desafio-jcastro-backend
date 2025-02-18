import { IsBoolean } from 'class-validator';

export class MarkFavoriteDto {
  @IsBoolean()
  favorito: boolean;
}
