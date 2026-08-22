export type City = {
    name: string;
    country: string;
    region?: string;
    population: number;
};

export async function getCities(): Promise<City[]> {
    const response = await fetch(
        "https://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10", 
    );

    console.log(response);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const body = await response.json();
    return body.data;
}
 