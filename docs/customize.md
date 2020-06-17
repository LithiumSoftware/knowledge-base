# Customize the app with your brand

Customizing this app with your brand is simple thanks to React Native Paper theme.

## Step by step
1. You'll want to get your own companies colours in this, for this we'll edit `packages/mobile/App.tsx` where we create the theme and define the primary colour, change that value to match whatever colour you're looking for
2. In assets we'll want to submit a new icon/logo, so add your company logo there. TODO: Change icon import so it doesn't depend on the company (i.e. change `lithium-icon.png` to `icon.png`)
3. Lastly, the sidebar component (`packages/mobile/components/Sidebar.tsx`) and the Home screen (`packages/mobile/screens/Home.tsx`) are the components in charge of displaying titles with the company name, feel free to edit those to change it to your company's name.
