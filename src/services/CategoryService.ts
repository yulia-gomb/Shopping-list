export class CategoryService {
    private static categories: string[] = [
        'Fruits',
        'Vegetables',
        'Meat',
        'Dairy',
        'Bakery',
        'Others',
    ];

    static getCategories(): string[] {
        return this.categories;
    }

}
