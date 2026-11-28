export const CHANGELOG_RELEASES = [
  {
    version: "v1.3",
    date: "2026-11-28",
    latest: true,
    sections: [
      {
        category: "Mobile app",
        groups: [
          {
            title: "Bug fixes and offline sync recovery",
            items: [
              "Photo and CSV uploads now read file bytes through Expo FileSystem. This fixes photo upload failures on Android.",
              "All log forms replace manual date text fields with a native calendar date picker.",
              "The offline sync queue rejects invalid entries instead of retrying them forever.",
              "Unsynced log cards show the failure reason with Edit and Retry and Discard actions. Tapping the sync banner opens the pending queue.",
              "Timestamps guard against invalid dates instead of showing NaN.",
            ],
          },
          {
            title: "Tank-mix logging and water dilution",
            items: [
              "Users can tap Add another activity in one session and save all entries together.",
              "Foliar Fertilizer, Soil Drenching, Pesticide, and Fungicide logs include an optional water volume field in liters.",
              "The water volume carries over to the next activity added in the same session.",
            ],
          },
          {
            title: "Labels, icons, and filters",
            items: [
              "The app renames Foliar to Foliar Fertilizer and standardizes Fertiliser to Fertilizer.",
              "Harvest, Fertilizer, Foliar Fertilizer, and Pesticide use the updated icons.",
              "The Home weather card replaces the rained days badge with plain location text.",
              "Home recent logs remove the variety filter, default to Last 7 days, and order the date dropdown as Last 7 days, Last 30 days, and All dates.",
              "Block log titles show only the block name, such as Block A, across Home, Logs, and Tree Detail screens.",
              "The Trees tab orders the sort dropdown as A to Z, Yield high to low, and Most recent care.",
              "Every tree card in the Trees tab shows a green Healthy badge or a yellow Needs Attention badge.",
              "Custom group creation, editing, and deletion live inside the Trees group filter dropdown. The Trees header removes the top-right Groups button.",
              "Varieties on the Yield tab act as checkboxes. Unticking a variety hides it from the chart, total harvest count, and recent bindings list.",
            ],
          },
        ],
      },
      {
        category: "Consumer web",
        groups: [
          {
            title: "Tree detail page",
            items: [
              "The public tree detail page shows whole-farm, block, group, and single-tree care logs so it matches the mobile app timeline. Internal symptom photos stay hidden.",
              "Harvest logs group bound fruits by day and show fruit quantity with the durian icon instead of weight in kilograms.",
              "The tree detail header shows a green Healthy badge or a yellow Needs Attention badge based on tree status.",
              "Labels and translations use Fertilizer and Foliar Fertilizer, show water volume when recorded, and use the updated care icons.",
            ],
          },
        ],
      },
    ],
  },
  {
    version: "v1.2",
    date: "2026-11-28",
    latest: false,
    sections: [
      {
        category: "Mobile app",
        groups: [
          {
            title: "Startup and layout",
            items: [
              "The app opens with a two-step animated splash screen that starts on lime green and fades to orchard green.",
              "The Home, Trees, and Logs tabs have updated header spacing, rainfall card alignment, and list padding.",
            ],
          },
          {
            title: "Sign-in and farm access",
            items: [
              "Users sign in with a phone number and one-time passcode. Each account sees only its assigned farms.",
              "The app clears cached local orchard data whenever a user signs out or switches accounts.",
              "Expired sessions prompt the user to sign in again, and restricted actions show a permission notice.",
            ],
          },
          {
            title: "Maintenance logging and orchard tools",
            items: [
              "Care logs support nine activity types: Fertilizer, Pesticide, Fungicide, Foliar, Soil Drenching, Watering, Pruning, Needs Attention, and Mark Healthy.",
              "Notes and remarks are optional across all logging forms.",
              "Dosage inputs accept grams, kilograms, milliliters, and liters.",
              "Each user has a private list of saved products for repeat entry.",
              "Users can attach multiple symptom photos to a log. The app queues uploads when offline.",
              "Users can organize trees into custom groups. Group logs appear on the timeline of every member tree.",
              "The fruit binding screen supports continuous batch QR scanning without reopening the camera between fruits.",
              "Log cards on the Home and Logs tabs expand to show product details, notes, photos, and metadata.",
              "Users can edit tree details and edit or delete maintenance logs from the app.",
            ],
          },
          {
            title: "Notifications",
            items: [
              "The Home screen shows an unread notification bell badge that opens an in-app inbox.",
              "Owners receive rain alerts, rolling 30-minute activity digests, and immediate Needs Attention alerts. All three alerts are turned on by default.",
            ],
          },
        ],
      },
      {
        category: "Consumer web",
        groups: [
          {
            title: "Tree detail page",
            items: [
              "The public tree detail page shows all nine activity types in English, Bahasa Melayu, and Chinese.",
            ],
          },
        ],
      },
    ],
  },
];
