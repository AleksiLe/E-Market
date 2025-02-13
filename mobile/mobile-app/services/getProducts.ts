
export interface Product {
    _id: string;
    name: string;
    stock: number;
    price: number;
    description: string;
    brand: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export default async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products`, {
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (response.ok) {
            return json as Product[];
        } else {
            throw new Error(json.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}