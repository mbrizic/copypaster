import { Entity } from '../src/models'
import { replaceAll } from '../src/util';

test('test entity replacements', () => {
    const singleWord = new Entity("feature")

    expect(singleWord.getSnakeCase()).toBe("feature");
    expect(singleWord.getCamelCase()).toBe("feature");
    expect(singleWord.getPascalCase()).toBe("Feature");
    expect(singleWord.getLowerCase()).toBe("feature");
    expect(singleWord.getKebabCase()).toBe("feature");
    expect(singleWord.getUpperCase()).toBe("FEATURE");

    const twoWords = new Entity("some_feature")

    expect(twoWords.getSnakeCase()).toBe("some_feature");
    expect(twoWords.getCamelCase()).toBe("someFeature");
    expect(twoWords.getPascalCase()).toBe("SomeFeature");
    expect(twoWords.getLowerCase()).toBe("somefeature");
    expect(twoWords.getKebabCase()).toBe("some-feature");
    expect(twoWords.getUpperCase()).toBe("SOMEFEATURE");

    const threeWords = new Entity("some_new_feature")

    expect(threeWords.getSnakeCase()).toBe("some_new_feature");
    expect(threeWords.getCamelCase()).toBe("someNewFeature");
    expect(threeWords.getPascalCase()).toBe("SomeNewFeature");
    expect(threeWords.getLowerCase()).toBe("somenewfeature");
    expect(threeWords.getKebabCase()).toBe("some-new-feature");
    expect(threeWords.getUpperCase()).toBe("SOMENEWFEATURE");

    const inputWithKebabCase = new Entity("some-feature")

    expect(inputWithKebabCase.getSnakeCase()).toBe("some_feature");
    expect(inputWithKebabCase.getCamelCase()).toBe("someFeature");
    expect(inputWithKebabCase.getPascalCase()).toBe("SomeFeature");
    expect(inputWithKebabCase.getLowerCase()).toBe("somefeature");
    expect(inputWithKebabCase.getKebabCase()).toBe("some-feature");
    expect(inputWithKebabCase.getUpperCase()).toBe("SOMEFEATURE");
});

test('test if regex replacements are working fine with special characters', () => {
    const result1 = replaceAll(
        "test123",
        "12",
        "00"
    );

    expect(result1).toBe("test003")

    const result2 = replaceAll(
        "new function(),",
        "function()",
        "class()"
    );

    expect(result2).toBe("new class(),")
});