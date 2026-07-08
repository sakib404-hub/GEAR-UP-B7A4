export interface IResponse<T> {
    success: boolean,
    statusCode: number,
    message: string;
    data?: T,
    metaData ? : IMetaData 
}

interface IMetaData {
    page: number;
    limit: number;
    total: number
}