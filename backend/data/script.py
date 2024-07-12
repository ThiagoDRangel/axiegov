import json
import os


def split_json_file(input_file, output_folder, chunk_size):

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    os.makedirs(output_folder, exist_ok=True)

    for i in range(0, len(data), chunk_size):
        chunk = data[i:i + chunk_size]
        output_file = os.path.join(
            output_folder, f"chunk_{i // chunk_size}.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(chunk, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    input_file = './server.json'
    output_folder = './output_json_chunks'
    chunk_size = 100

    split_json_file(input_file, output_folder, chunk_size)
