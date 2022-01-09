# Copypaster

Has your project structure gotten so complex that to add a new feature you need to copy, paste and rename tens or hundreds of files each time? And now you're thinking of writing a code generator tool to help you with that repetitive manual work?  

This tool is a simple helper you might use instead, and it works this way:
1. Identify all files and folders you want to use as template (let's say you have a  `module/user/user-settings` folder)
2. Tell the tool to replace all `user` occurences in the template with, let's say, `dog`
3. Tool will copy the template files you specified, while replacing `user` with `dog` in all file names and their contents, preserving naming conventions (camelCase, pascalCase, snake_case, etc.)

## How to use

1. Install this tool globally `npm install -g copypaster`
2. Create `copypaster.config.json` file in your project's root directory and fill it based on below explanation
3. Run `copypaster` from that folder and follow on-screen instructions

## How does config file work

You can see the example `copypaster.config.json` in `example` directory, but basically it's gonna look something like this: there's an arbitrary template name that you can set, followed by an object containing template logic:
- `replacementKey` - string that will get replaced with whatever you tell the tool with. Must be in `snake_case` or `kebab-case`.
- `folders` - array containing folders you want to copy
- `files` - array containing files you want to copy
- `lines` - array of individual lines you want to copy (new line gets inserted right after the specified one)
- `description` - decorative text explaining what the template does, not used in generated code

Example: 

```json
{
    "someAppModuleThatYouWantToUseAsTemplate": {
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
        "lines": [
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

## TODO
There are a few things which are not implemented yet (contributions are welcome):
- no `*` pattern matching in config files
- ask user to create `copypaster.config.json` config file if not present