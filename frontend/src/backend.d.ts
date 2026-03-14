import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: string;
    name: string;
    description: string;
}
export interface LocationRecommendation {
    suggestions: Array<string>;
    city: string;
}
export interface backendInterface {
    getAllCategories(): Promise<Array<Category>>;
    getAllLocationRecommendations(): Promise<Array<LocationRecommendation>>;
    getCategory(id: string): Promise<Category>;
    getLocationRecommendations(city: string): Promise<LocationRecommendation>;
    initialize(): Promise<void>;
}
