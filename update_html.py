#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Читаємо HTML файл
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Прямі замінення всіх посилань на зображення
replacements = [
    ('background: url(&quot;src/Analyze_the_bouquet_2k_202602111317.jpeg&quot;)', 
     'background: url(&quot;src/Analyze_the_bouquet_2k_202602111317.webp&quot;)'),
    ('background: url(&quot;src/Edit_this_photo_2k_202601161146.jpeg&quot;)', 
     'background: url(&quot;src/Edit_this_photo_2k_202601161146.webp&quot;)'),
    ('background: url(&quot;src/Gemini_Generated_Image_8f1o3k8f1o3k8f1o (1).png&quot;)', 
     'background: url(&quot;src/Gemini_Generated_Image_8f1o3k8f1o3k8f1o (1).webp&quot;)'),
    ('background: url(&quot;src/Gemini_Generated_Image_fpiojlfpiojlfpio (1).png&quot;)', 
     'background: url(&quot;src/Gemini_Generated_Image_fpiojlfpiojlfpio (1).webp&quot;)'),
    ('background: url(&quot;src/Gemini_Generated_Image_lh6mzylh6mzylh6m.png&quot;)', 
     'background: url(&quot;src/Gemini_Generated_Image_lh6mzylh6mzylh6m.webp&quot;)'),
    ('background: url(&quot;src/Gemini_Generated_Image_lpchtdlpchtdlpch.png&quot;)', 
     'background: url(&quot;src/Gemini_Generated_Image_lpchtdlpchtdlpch.webp&quot;)'),
    ('background: url(&quot;src/Image_202601161105.jpeg&quot;)', 
     'background: url(&quot;src/Image_202601161105.webp&quot;)'),
    ('background: url(&quot;src/Remove_the_black_2k_202601251453.jpeg&quot;)', 
     'background: url(&quot;src/Remove_the_black_2k_202601251453.webp&quot;)'),
    ('background: url(&quot;src/This_is_an_2k_202602111337.jpeg&quot;)', 
     'background: url(&quot;src/This_is_an_2k_202602111337.webp&quot;)'),
    ('background: url(&quot;src/This_is_an_2k_202602111344.jpeg&quot;)', 
     'background: url(&quot;src/This_is_an_2k_202602111344.webp&quot;)'),
    ('background: url(&quot;src/Analyze_the_bouquet_2k_202602111321.jpeg&quot;)', 
     'background: url(&quot;src/Analyze_the_bouquet_2k_202602111321.webp&quot;)'),
    ('background: url(&quot;src/11.jpeg&quot;)', 
     'background: url(&quot;src/11.webp&quot;)'),
    ('background: url(&quot;src/12.jpeg&quot;)', 
     'background: url(&quot;src/12.webp&quot;)'),
    ('background: url(&quot;src/13.jpeg&quot;)', 
     'background: url(&quot;src/13.webp&quot;)'),
    ('background: url(&quot;src/14.jpeg&quot;)', 
     'background: url(&quot;src/14.webp&quot;)'),
    ('background: url(&quot;src/2.jpg&quot;)', 
     'background: url(&quot;src/2.webp&quot;)'),
    ('background: url(&quot;src/3.jpeg&quot;)', 
     'background: url(&quot;src/3.webp&quot;)'),
    ('background: url(&quot;src/4.jpeg&quot;)', 
     'background: url(&quot;src/4.webp&quot;)'),
    ('background: url(&quot;src/5.jpeg&quot;)', 
     'background: url(&quot;src/5.webp&quot;)'),
    ('background: url(&quot;src/6.jpeg&quot;)', 
     'background: url(&quot;src/6.webp&quot;)'),
    ('background: url(&quot;src/7.jpeg&quot;)', 
     'background: url(&quot;src/7.webp&quot;)'),
    ('background: url(&quot;src/8.jpeg&quot;)', 
     'background: url(&quot;src/8.webp&quot;)'),
    ('background: url(&quot;src/9.jpeg&quot;)', 
     'background: url(&quot;src/9.webp&quot;)'),
    ('background: url(&quot;src/10.jpeg&quot;)', 
     'background: url(&quot;src/10.webp&quot;)'),
]

count = 0
for old, new in replacements:
    if old in html_content:
        html_content = html_content.replace(old, new)
        count += 1
        filename = old.split('/')[-1].split('&')[0]
        print(f"✓ Замінено: {filename}")

# Записуємо оновлений HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"\n{'='*70}")
print(f"✓ Оновлення завершено!")
print(f"  Всього замінено посилань: {count}")
print(f"  Файл index.html оновлено успішно")
print(f"{'='*70}")
