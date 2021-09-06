# Action: Schematron compile

```yaml
- name: Prepare schematron files
  uses: k15g/action-schemeatron-compile@edge
  with:
    files: |
      target.xslt: source.sch
```
