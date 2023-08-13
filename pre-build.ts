import * as fs from 'fs';

const replaceEnvVars = (str: string) => {
	// matches ${VAR_NAME} and replaces it with the value of the environment variable VAR_NAME
	return str.replace(/\${(\w+)}/g, (match, p1) => {
		return process.env[p1] || '';
	});
};

export const generateEnvFile = async () => {
	const environmentVariables = ['PUBLIC_SPOTIFY_CLIENT_ID', 'PUBLIC_DOMAIN'];
	console.log('Generating .env');
	const filePath = '.env';

	const fileContent = environmentVariables
		.map((variable) => `${variable}=${process.env[variable]}`)
		.join('\n');

	const replacedContent = replaceEnvVars(fileContent);
	await fs.promises.writeFile(filePath, replacedContent);
};

generateEnvFile();