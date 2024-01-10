export const config = {
    app_name: "fiesta-pos-app",
    app_ver: "1.0.0",
    app_display_name: "Fiesta Point of Sales System",
    external_links: [
        {
            title: 'Menu',
            description: "View Public Restaurant Menus",
            url: 'https://www.fiesta.lk/menu'
        },
        {
            title: "Reservations",
            description: "Manage Reservations",
            url: "https://reservations.fiesta.lk/fiesta"
        },
        {
            title: "Inventory",
            description: "Manage Inventory & Purchases",
            url: "https://inventory.fiesta.lk"
        },
        {
            title: "Help",
            description: "POS System Help",
            url: "https://staff.fiesta.lk/pos"
        }
    ],
    flags: {
        useActualSmsGateway: false
    }
}