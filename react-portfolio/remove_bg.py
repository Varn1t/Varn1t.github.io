import os
from rembg import remove
from PIL import Image

def process_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".png") and not filename.endswith("-orig.png"):
            input_path = os.path.join(directory, filename)
            backup_path = os.path.join(directory, filename.replace(".png", "-orig.png"))
            output_path = os.path.join(directory, filename)
            
            print(f"Processing {filename}...")
            try:
                # Create backup
                if not os.path.exists(backup_path):
                    with open(input_path, 'rb') as f_in, open(backup_path, 'wb') as f_out:
                        f_out.write(f_in.read())
                
                # Open image
                input_image = Image.open(input_path)
                
                # Remove background with alpha matting to keep edges clean
                output_image = remove(input_image, alpha_matting=True)
                
                # Save as transparent png, overwriting original
                output_image.save(output_path)
                print(f"Successfully processed {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    assets_dir = r"c:\Users\varni\OneDrive\Desktop\Portfolio\react-portfolio\public\assets"
    process_images(assets_dir)
