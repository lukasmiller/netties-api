import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core'; 
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';

export const config: VendureConfig = {
    apiOptions: {
        port: Number(process.env.PORT),
        adminApiPath: 'admin-api',
        adminApiPlayground: process.env.PLAYGROUND_ENABLED == 'true' ? 
        {
            settings: {
                'request.credentials': 'include',
            } as any,
        }
        : false,
        adminApiDebug: process.env.PLAYGROUND_ENABLED == 'true', 
        shopApiPath: 'shop-api',
        shopApiPlayground: process.env.PLAYGROUND_ENABLED == 'true' ? 
        {
            settings: {
                'request.credentials': 'include',
            } as any,
        }
        : false,
        shopApiDebug: process.env.PLAYGROUND_ENABLED == 'true',
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'admin_netties',
            password: 'Oldpaths1!',
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET || 'cookie-secret',
        },
    },
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: process.env.SYNCRONIZE_DB == 'true',
        logging: false,
        url: process.env.DATABASE_URL,
        ssl: process.env.SSL_ENABLED == 'true' ? 
        {
            rejectUnauthorized: false
        } 
        : false,
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: Number(process.env.PORT) + 2,
        }),
    ],
};
