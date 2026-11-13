# فيديوهات سهم ستوديو

مشروع Remotion + Claude Code: تصف الفيديو بالكلام، فيبنيه Claude بهوية سهم ستوديو ويصدّره MP4.

## المتطلبات
- Node.js 20.19+ أو 22.13+
- Python 3.10+ و FFmpeg (`sudo apt install ffmpeg python3-venv`)
- [Claude Code](https://claude.com/claude-code) مسجّل الدخول بحسابك
- (اختياري) حساب ElevenLabs لتسجيل الأصوات الاحترافية

## الإعداد (مرة واحدة)
```bash
git clone <رابط المستودع> sahem-videos
cd sahem-videos
bash scripts/setup.sh
```

## الاستعمال
1. طرفية أولى: `npm run dev` (المعاينة على http://localhost:3000)
2. طرفية ثانية: `claude`، ثم اكتب فكرتك، أو:
   ```
   /video ريل عن أهمية الهوية البصرية للمطاعم
   ```
3. التصدير: `npx remotion render src/index.ts Reel001 out/reel-001.mp4`

كل القواعد (الألوان، الخطوط، الحركة، لا موسيقى، لا ذوات أرواح) في `CLAUDE.md`، ويقرؤها Claude تلقائياً.
دليل الشرح الكامل: `docs/`.
