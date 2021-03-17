import { IsEmail, IsNotEmpty, IsString, IsInt, IsDateString, IsBoolean, IsIn, IsPositive } from 'class-validator';

export class ShortSequenceDTO {

    @IsInt()
    readonly tikee_id?: number;
    @IsString()
    readonly name?: string;
    @IsString()
    readonly description?: string;
    @IsDateString()
    readonly start?: string;
    @IsInt()
    readonly interval?: number;
    @IsInt()
    @IsPositive()
    readonly duration?: number;
    @IsBoolean()
    readonly upload_to_cloud?: boolean;
    @IsIn(['jpeg', 'jpg', 'png'])
    readonly image_format?: string;
    @IsBoolean()
    readonly keep_local_copy?: boolean;
    @IsInt()
    readonly sequence_id?: number;
    @IsString()
    readonly shooting_status?: string;
    @IsInt()
    readonly nb_images_on_sd?: number;
    @IsInt()
    readonly nb_images_uploaded?: number;
}
