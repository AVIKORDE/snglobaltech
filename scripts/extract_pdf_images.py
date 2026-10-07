import pymupdf as fitz, os, sys
out = sys.argv[3]
os.makedirs(out, exist_ok=True)
for tag, path in [("cat", sys.argv[1]), ("agri", sys.argv[2])]:
    doc = fitz.open(path)
    for pno, page in enumerate(doc, start=1):
        for i, img in enumerate(page.get_images(full=True)):
            xref, smask = img[0], img[1]
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha >= 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            if smask:
                mask = fitz.Pixmap(doc, smask)
                try:
                    pix = fitz.Pixmap(pix, mask)
                except Exception as e:
                    print("mask fail", e)
            rects = page.get_image_rects(xref)
            r = rects[0] if rects else fitz.Rect(0,0,0,0)
            name = f"{tag}_p{pno:02d}_i{i}_x{int(r.x0)}_y{int(r.y0)}_{pix.width}x{pix.height}_a{pix.alpha}.png"
            pix.save(os.path.join(out, name))
            print(name)
