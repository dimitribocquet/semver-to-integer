# SemVer to Integer

This action converts a SemVer version to an integer version.

## Inputs

| parameter | type    | description                               | required | default |
|-----------|---------|-------------------------------------------|----------|---------|
| semver    | String  | SemVer version to convert                 | true     |         |
| zero_pad  | Integer | Zero pad you want for the integer version | false    | 3       |

## Outputs

| parameter | type    | description                          | required | default |
|-----------|---------|--------------------------------------|----------|---------|
| integer   | Integer | The generated SemVer integer version | true     |         |

## Example:

With `semver: 2.3.4-alpha.5` and `zero_pad: 3`, you will get **002003004100005** *(002.003.004.100.005)*

## Usage

```yml
jobs:
  my_job:
    runs-on: ubuntu-latest
    name: My Job
    steps:
      - name: SemVer to integer step
        id: semver
        uses: dimitribocquet/semver-to-integer@v1
        with:
          semver: '2.3.4-alpha.5'
          zero_pad: 3
      - name: Display the output integer version
        run: echo "Converted SemVer to: ${{ steps.semver.outputs.integer }}"
```

You can combine it with [dawidd6/action-get-tag](https://github.com/dawidd6/action-get-tag) to convert your tag version to integer version:

```yml
on:
  push:
    tags:
      - "v*.*.*"

jobs:
  semver_tag_to_integer:
    runs-on: ubuntu-latest
    name: SemVer tag to integer
    steps:
      - name: Get tag
        id: tag
        uses: dawidd6/action-get-tag@v1
        with:
          strip_v: true
      - name: Tag to integer
        id: semver
        uses: dimitribocquet/semver-to-integer@v1
        with:
          semver: ${{steps.tag.outputs.tag}}
          zero_pad: 3
      - name: Display the output integer version
        run: echo "Converted SemVer to: ${{ steps.semver.outputs.integer }}"
```
