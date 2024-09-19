# Copypaster

Has your project structure gotten so complex that to add a new feature you need to copy, paste and rename tens or hundreds of files each time? And now you're thinking of writing a code generator to help you with that repetitive manual work?  

This tool is a simple helper you might use instead, and it works this way:
1. You identify all files and folders you want to use as template (let's say you have a  `module/user/user-settings` folder)
2. You tell the tool to replace all `user` occurences in the template with, let's say, `dog`
3. The tool then copies the template files you specified, while replacing `user` with `dog` in all file names and their contents, preserving naming conventions (camelCase, pascalCase, snake_case, etc.)

## How to use

1. Install this tool globally `npm install -g copypaster`
2. Run `copypaster` in your project's root directory, which will ask you to create a `copypaster.config.json` templates file
3. Define which files or folders you want to use as templates in config file
3. Run `copypaster` again and follow on-screen instructions to actually generate a code from template

## How does config file work

You can see the example `copypaster.config.json` in `example` directory, but basically it's gonna look something like this: there's an arbitrary template name that you can set, followed by an object containing template logic:

- `replacementKey` - string that will get replaced with whatever you tell the tool with. Must be in `snake_case` or `kebab-case`.
- `folders` - array containing folders you want to copy
- `files` - array containing files you want to copy
- `snippets` - array of individual snippets you want to copy (new line gets inserted right after the specified one)
- `description` - decorative text explaining what the template does, not used in generated code

The config file can be kept either in your working folder or in your home directory.

Example of a config file: 

```json
{
    "someBatchOfFilesYouWantToUseAsTemplate": {
        "replacementKey": "space_station",
        "description": "Template made from Space Station app module.",
        "folders": [
            "space-station/",
            "space-station/space-station-parts"
        ],
        "files": [
            "space-station/space-station.api.js",
            "space-station/SpaceStation.js",
            "space-station/space-station-parts/space-station-parts.service.js"
        ],
        "snippets": [
            {
                "file": "example.routes.js",
                "content": "\t\"space-station/space-station.api\","
            }
        ]
    },
    "someOtherModule": {
        "replacementKey": "station",
        "description": "Another template",
        "folders": [
            "space-station/"
        ],
        "files": [
            "space-station/space-station.api.js"
        ]
    }
}
```

## Code structure

There's `cli.ts` as the entry point which handles user input, which then offloads the actual codegen part to `generator.ts`. All other files are helper stuff to do string or file manipulations.

Tool is currently not using any external dependencies. Typescript is used when developing locally, but built files get exported and ran as vanilla Javascript with zero dependencies.