import { IsEmail, IsNotEmpty, IsString, IsInt, IsDateString, IsBoolean, IsIn, IsNotIn } from 'class-validator';

export class LongSequenceDTO {

    @IsInt()
    readonly tikee_id?: number;

    @IsString()
    readonly name?: string;

    @IsString()
    readonly description?: string;

    @IsDateString()
    start?: string;

    @IsDateString()
    readonly end?: string;

    @IsBoolean()
    readonly upload_to_cloud?: boolean;

    @IsIn(['jpeg', 'jpg', 'png'])
    readonly image_format?: string;

    @IsBoolean()
    readonly keep_local_copy?: boolean;

    @IsBoolean()
    readonly infinite_duration?: boolean;

    @IsInt()
    readonly sequence_id?: number;
    
    @IsString()
    readonly shooting_status?: string;

    @IsInt()
    readonly nb_images_on_sd?: number;

    @IsInt()
    readonly nb_images_uploaded?: number;
}
