import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type UserConfig } from 'vite';
import fs from 'fs';

const isLocalhost = process.env.NODE_ENV === 'development';

const generateConfig = (): UserConfig => {
	const config: UserConfig = {
		plugins: [sveltekit()]
	};

	if (isLocalhost) {
		config.server = {
			https: {
				key: fs.readFileSync(`${__dirname}/cert/key.pem`),
				cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
			},
			proxy: {}
		};
	}

	return config;
};

export default defineConfig(generateConfig());
