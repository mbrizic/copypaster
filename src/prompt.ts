const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('close', function () {
    process.exit(0)
})

export function ask(text: string, fn: (result: string) => void) {
    rl.question(text, (input: string) => {
        fn(input)
    })
}