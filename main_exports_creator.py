def main_exports_creator() -> None:
  for root, dirs, files in os.walk('./src'):
    for dir in dirs:
      dir_ts_file_path = f"{root}/{dir}.ts"
      ts_file = open(dir_ts_file_path, 'w', encoding='utf8')
      for dir_root, dir_dirs, dir_files in os.walk(f"{root}/{dir}"):
        for dir_file in dir_files:
          module_name = Path(dir_file).with_suffix('')
          ts_file.write(f"export * from './{dir}/{module_name}.js'\n")

if __name__ == "__main__":
  import os
  from pathlib import Path
  main_exports_creator()