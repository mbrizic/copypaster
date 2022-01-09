import { ensureDirectoryExists, checkIfExists, deleteDirectory, ensureFileDirectoryExists, writeFile } from '../src/file.service'
import path from 'path'

const testFileContents = "TEST"
const testDirectory = path.join(
    process.cwd(),
    "example/space-station/test"
)

test('test nested directories are created properly', () => {
    const directoryPath = path.join(
        testDirectory,
        "/sub/direc/tories/work"
    )

    ensureDirectoryExists(directoryPath)

    expect(
        checkIfExists(directoryPath)
    ).toBe(true)

    deleteDirectory(testDirectory)
});

test('test needed suddirectories are created properly for a file', () => {
    const filePath = path.join(
        testDirectory,
        "verify/sub/direc/tories/work/for/template-file.ts"
    )

    writeFile(filePath, testFileContents)

    expect(
        checkIfExists(filePath)
    ).toBe(true)

    deleteDirectory(testDirectory)
});