import path from 'path'

export const getPath = (filePath: string) => path.join(__dirname, '../../data', filePath)
export const getFile = (filePath: string) => Bun.file(getPath(filePath))
export const writeFile = async (filePath: string, data: string) =>
	await Bun.write(getPath(filePath), `${await getFile(filePath).text()}\n${data}`)

export const readFileContent = async (filePath: string): Promise<string> => {
	try {
		const file = getFile(filePath)
		const text = await file.text()
		return text
	} catch (error) {
		console.error('Error reading file:', filePath, error)
		throw new Error(`Failed to read file: ${filePath}`)
	}
}

export const readFileLines = async (filePath: string): Promise<string[]> => {
	try {
		const text = await readFileContent(filePath)
		return text.split('\n').filter(line => line.trim() !== '')
	} catch (error) {
		console.error('Error reading file lines:', filePath, error)
		throw new Error(`Failed to read file lines: ${filePath}`)
	}
}
