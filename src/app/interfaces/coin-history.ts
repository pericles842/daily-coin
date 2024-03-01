/**
 *Data completa del historial de monedas
 *
 * @export
 * @interface CoinHistory
 */
export interface CoinHistory {
    [key: string]: DataHistoryCoin[];
}

/**
 *Data del arreglo del historial de monedas
 *
 * @export
 * @interface DataHistoryCoin
 */
export interface DataHistoryCoin {
    id: number;
    name: string;
    price: number;
    day_week: number;
    statistics: string;
    created_at: string;
    updated_at: string;
}