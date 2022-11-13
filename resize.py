import os
import glob
from PIL import Image

to_width = 650

dir = 'www/assets/contents/artifacts/'

target_images = glob.glob(dir + '**/*.png', recursive=True)

for image in target_images:
    if image.endswith('.min.png'):
        continue
    print("Found: " + image)
    im = Image.open(image)
    original_width, original_height = im.size

    resized_height = int(original_height / (original_width / to_width))

    im_resized = im.resize((to_width, resized_height), Image.ANTIALIAS)

    im_resized.save(image[:-4] + '.min.png')
