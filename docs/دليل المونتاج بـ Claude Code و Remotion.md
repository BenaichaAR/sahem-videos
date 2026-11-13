# دليل المونتاج بـ Claude Code و Remotion

Nov 11, 2026 · @نريد أفكار عملية و مبتكرة لتطبيقات تستخدم الذكاء الاصطناعي التقل

## الفكرة والأدوات

الأقوى لمونتاج بلا موسيقى ومحتوى حلال هو **Remotion** مع **Claude Code**: تصف الفيديو بالكلام، فيكتب Claude المشاهد ككود React، وتراها مباشرة في المتصفح، ثم تصدّرها MP4. كل شيء عندك محلي، والثيم الخاص بك يُطبَّق على كل الفيديوهات بنفس الهوية.

| الأداة | وظيفتها |
| --- | --- |
| Remotion | بناء الفيديو بالكود: مشاهد ونصوص وزوم وانتقالات |
| Claude Code | يكتب ويعدّل المشاهد حسب وصفك |
| Edge TTS / ElevenLabs | توليد التعليق الصوتي |
| Whisper | تفريغ الصوت إلى نص بتوقيت دقيق للترجمة المتحركة |
| FFmpeg | قص وضغط وتحويل الفيديوهات المصوّرة الجاهزة |

المبدأ بالنسبة للصوت: تعليق صوتي بشري فقط، وبدون موسيقى أو مؤثرات صوتية. الإفكتات كلها **بصرية** (حركة، زوم، انتقالات).

## التثبيت

تحتاج Node.js (نسخة حديثة) وFFmpeg وClaude Code مثبتة على جهازك (Linux Mint). تحقق بهذه الأوامر:

```bash
node -v
ffmpeg -version
claude --version
```

ثم أنشئ المشروع وثبّت سكيلز Remotion:

```bash
npx create-video --yes --blank my-video
cd my-video
npx remotion skills add
npm run dev
```

افتح طرفية ثانية داخل نفس المجلد وشغّل `claude`. المعاينة تعمل على المتصفح (Remotion Studio) وتتحدث فور تعديل Claude للملفات.

إن لم يتثبت FFmpeg: `sudo apt install ffmpeg`.

## السكيلز والبلقنز

السكيلز تعليمات جاهزة يقرؤها Claude قبل العمل فيكتب كوداً أدق. المفيد منها:

- **remotion-best-practices**: السكيل الرسمي لقواعد Remotion (التوقيت، الميديا، التركيب). يُستدعى بـ `/remotion-best-practices`.
- **بلقن Remotion الرسمي**: يحمّل السكيلز تلقائياً.

```bash
claude plugin marketplace add remotion-dev/claude-code-plugin
claude plugin install remotion@remotion
```

أعد تشغيل Claude Code بعد التثبيت. والبديل: `npx skills add remotion-dev/skills`، ثم تأكد بـ `npx skills list --agent claude-code`.

**سكيل خاص بك**: بعد أن يستقر ثيمك وأسلوبك، اجعله سكيلاً باسم مثل `my-video-style` يحوي الألوان والخطوط وسرعة الحركة وقواعد الصوت، فيلتزم به Claude في كل مشروع جديد.

## هيكلة المشروع والثيم

القاعدة: كل قيمة بصرية تأتي من ملف واحد هو `theme.ts`، وكل قاعدة عامة تكتب في `CLAUDE.md` ليقرأها Claude في كل جلسة.

```text
my-video/
  CLAUDE.md
  public/
    voice/      ملفات التعليق الصوتي
    clips/      لقطات مصوّرة
    images/     الشعار والصور
  src/
    theme.ts
    components/ Camera.tsx و Title.tsx و Caption.tsx
    scenes/     مشهد لكل ملف
    Root.tsx
```

**theme.ts** (ضع ألوانك وخطوطك الحقيقية):

```ts
export const theme = {
  colors: { bg: "#0B1220", primary: "#16A34A", accent: "#F5C542", text: "#FFFFFF" },
  fonts: { heading: "Cairo", body: "Tajawal" },
  motion: { damping: 200, fadeFrames: 12 },
  logo: "images/logo.png",
};
```

**CLAUDE.md** (قالب جاهز تعدّله):

```markdown
# قواعد مشروع الفيديو
- استخدم الألوان والخطوط من src/theme.ts فقط، ولا تخترع ألواناً.
- النصوص عربية RTL (direction: rtl) ومنطقة آمنة من الحواف.
- ممنوع أي موسيقى أو مؤثرات صوتية. الصوت الوحيد هو التعليق البشري في public/voice.
- الإفكتات بصرية بسيطة: زوم ناعم، انزلاق، تلاشي، ظهور كلمة بكلمة. لا تملأ الشاشة.
- كل مشهد ملف مستقل في src/scenes ويلتف بمكون Camera.
- عدّل الملف المعني فقط ولا تعد قراءة المشروع كله.
- التصدير: 1920x1080 للعريض، 1080x1920 للقصير، 30 إطاراً/ثانية.
```

## الصوت: أدوات توليد التعليق الصوتي

أقرب خيار لك هو **Edge TTS**: مجاني، سهل التثبيت، وله أصوات عربية (منها جزائرية وسعودية)، ويولّد ملف توقيت مع الصوت. هو مكتبة غير رسمية تستعمل خدمة مايكروسوفت وتحتاج إنترنت، وقد تتغير أو تتوقف.

```bash
pip install edge-tts
edge-tts --list-voices | grep ar-
edge-tts --voice ar-SA-HamedNeural --file script.txt \
  --write-media public/voice/scene1.mp3 --write-subtitles public/voice/scene1.vtt
```

أسماء الأصوات المقترحة للتجربة (تحقق منها بأمر `--list-voices`): `ar-SA-HamedNeural` و`ar-DZ-IsmaelNeural` و`ar-EG-ShakirNeural`.

| الخيار | الجودة | التكلفة | ملاحظات |
| --- | --- | --- | --- |
| Edge TTS | جيدة | مجاني | يحتاج إنترنت، غير رسمي |
| ElevenLabs | ممتازة | مدفوع (لها حد مجاني محدود) | نبرة قريبة من البشرية، استنساخ الصوت |
| Piper | متوسطة | مجاني | يعمل بدون إنترنت، الأصوات العربية محدودة |

نصيحة لجودة أعلى: اكتب النص بجمل قصيرة ومشكّلة عند الكلمات الملتبسة، وولّد كل مشهد بملف منفصل لتعديل ما تشاء دون إعادة الكل. واستمع للنطق قبل المونتاج خاصة إن كان المحتوى دينياً أو فيه ألفاظ شرعية.

## التفريغ والترجمة المتحركة

إذا ولّدت الصوت بـ Edge TTS فملف `.vtt` يعطيك التوقيت جاهزاً. وإذا كان عندك تسجيل صوتي أو فيديو مصوّر، استخرج النص بـ **Whisper** محلياً:

```bash
pip install faster-whisper
```

ثم قل لـ Claude: «اكتب سكربت بايثون يفرّغ public/voice/scene1.mp3 إلى JSON بتوقيت كل كلمة (بالثانية)». بعدها قل: «ابنِ مكوّن Caption يظهر كل كلمة في وقتها ويضيء الحالية بلون accent من الثيم».

Remotion نفسه فيه حزم للترجمة والتفريغ مثل `@remotion/captions` و`@remotion/install-whisper-cpp`، ويمكنك طلب استعمالها بدل السكربت. الترجمة مهمة جداً لأن معظم المشاهدات تشغّل الفيديو بدون صوت.

## الزوم وحركة الكاميرا والإفكتات

الفكرة: كل مشهد يُلفّ بمكوّن `Camera` يحرّك التكبير والإزاحة بحركة `spring` ناعمة. أعطِ Claude هذا المكوّن كبداية:

```tsx
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

export const Camera: React.FC<{
  children: React.ReactNode;
  zoomTo?: number; startFrame?: number; x?: number; y?: number;
}> = ({children, zoomTo = 1.25, startFrame = 0, x = 0, y = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - startFrame, fps, config: {damping: 200}});
  const scale = interpolate(p, [0, 1], [1, zoomTo]);
  return (
    <AbsoluteFill style={{transform: `scale(${scale}) translate(${-x * p}px, ${-y * p}px)`}}>
      {children}
    </AbsoluteFill>
  );
};
```

**إفكتات بصرية بسيطة تصنع فرقاً كبيراً:**

- زوم بطيء داخل أثناء الكلام، وزوم خارج عند نهاية المشهد.
- تحريك الكاميرا نحو الكلمة المهمة أو العنصر المقصود عند ذكره.
- انتقالات انزلاق وتلاشٍ بين المشاهد باستعمال `@remotion/transitions`.
- ظهور النص كلمة بكلمة مع إزاحة صغيرة لأعلى.
- مربع أو خط ملوّن يرسم نفسه حول الكلمة المهمة للإبراز.
- حركة خلفية بطيئة (تدرج متحرك أو أشكال هندسية ناعمة) لتبدو الشاشة حيّة.

أمثلة طلبات جاهزة: «أضف زوم بطيئاً إلى 1.15 في المشهد الثالث»، «حرّك الكاميرا نحو العنوان عند الثانية 2»، «اجعل الانتقال بين المشهدين انزلاقاً من اليمين مدته 12 إطاراً».

## سير العمل خطوة بخطوة

1. اكتب السكربت بمساعدة Claude، مقسّماً إلى مشاهد قصيرة (جملة أو جملتان لكل مشهد).
2. ولّد التعليق الصوتي لكل مشهد من ملف نصي منفصل واحفظه في `public/voice`.
3. استخرج مدة كل ملف صوتي وتوقيت الكلمات (VTT أو Whisper).
4. قل لـ Claude: «ابنِ المشاهد حسب هذه المدد وهذا التوقيت، بالثيم، مع زوم وانتقالات». ابدأ بمشهد واحد أولاً لتضبط الستايل.
5. عاين في Remotion Studio وعدّل مشهداً بمشهد بطلب واحد في كل مرة.
6. عند الرضا صدّر:

```bash
npx remotion render src/index.ts MyVideo out/video.mp4
```

7. احفظ ما نجح كقالب (مشاهد ومكونات) لاستعماله في الفيديو التالي، وهكذا تسرع كل فيديو جديد.

## مونتاج فيديو مصوّر جاهز بـ FFmpeg

إن عندك لقطات مصوّرة وتريد مونتاجها: ضعها في `public/clips` واستعملها داخل Remotion بالوسم `OffthreadVideo` مع الزوم والترجمة. وللعمليات السريعة استعمل FFmpeg مباشرة:

```bash
# قص مقطع من الثانية 10 إلى 25
ffmpeg -i in.mp4 -ss 00:00:10 -to 00:00:25 -c copy cut.mp4

# حذف أي صوت من المقطع
ffmpeg -i in.mp4 -an -c:v copy silent.mp4

# صورة إلى مقطع بزوم بطيء (5 ثوان)
ffmpeg -loop 1 -i img.jpg -vf "zoompan=z='min(zoom+0.0015,1.3)':d=150:s=1920x1080:fps=30" -t 5 -pix_fmt yuv420p zoom.mp4

# تحويل عريض إلى عمودي 9:16
ffmpeg -i in.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" vertical.mp4
```

الأفضل أن تطلب من Claude كتابة الأمر ثم شرحه، وتجرّبه على نسخة من الملف وليس الأصل.

## نصائح الجودة والتوفير

- **ابدأ بمشهد واحد** ثم كرّر نمطه. هذا أرخص وأسرع من طلب الفيديو كاملاً من البداية.
- **طلب واحد وتعديل واحد**: إذا غيّر Claude أشياء كثيرة دفعة واحدة يصعب مراجعته.
- **استعمل `/clear`** بين المهام المختلفة لتقليل استهلاك التوكنز، واطلب تعديل ملف محدد باسمه بدل قراءة المشروع كله.
- **النص العربي**: تأكد من اتجاه RTL ومن أن الخط يدعم العربية (Cairo أو Tajawal من Google Fonts)، ولا تقطع الكلمات بالحروف المتصلة.
- **المصادر المسموحة**: استخدم صوراً ولقطات من Pexels أو Unsplash أو من تصويرك، وراجع شروط الترخيص قبل النشر.
- **التصدير البطيء**: استخدم معاينة منخفضة الدقة أثناء التعديل، وصدّر بالجودة الكاملة مرة واحدة فقط في النهاية.

**ما لا يناسب**: Remotion ليس بديلاً عن برنامج مونتاج تقليدي إذا كان عملك قص لقطات مصوّرة طويلة دون مؤثرات. حينها FFmpeg أو محرر مجاني مثل Kdenlive أو DaVinci Resolve أسرع.

## الهيكلة النهائية لعدة فيديوهات (ريلز وستوري)

هذه الهيكلة تحلّ محل شجرة المجلدات الأولى أعلاه. مشروع واحد لكل فيديوهاتك، وكل فيديو مجلد داخل `videos/`:

```text
my-videos/
  CLAUDE.md
  brand/                 theme.ts و logo.png و fonts/
  src/
    index.ts
    Root.tsx             يسجّل كل الفيديوهات
    shared/              Camera.tsx و Caption.tsx و Outro.tsx
    videos/
      reel-001/          script.txt و scenes/
      story-002/
  public/
    voice/  clips/  refs/
  out/                   المصدّر
```

**الأحجام**: ريلز وستوري كلاهما عمودي 1080×1920 بـ 30 إطاراً/ثانية. اترك حواف علوية وسفلية فارغة لواجهة التطبيق. الفيديو العريض 1920×1080. تُسجّل في `Root.tsx`:

```tsx
import {Composition} from "remotion";
import {Reel001} from "./videos/reel-001";

export const Root = () => (
  <>
    <Composition id="Reel001" component={Reel001}
      durationInFrames={900} fps={30} width={1080} height={1920} />
  </>
);
```

**النهاية المتكررة (Outro)**: مكوّن واحد في `shared/Outro.tsx` يحوي الشعار واسمك ودعوة المتابعة، ومدته 3 ثوانٍ. كل فيديو يستدعيه في آخره بـ `<Sequence from={...} durationInFrames={90}><Outro /></Sequence>`. غيّره مرة واحدة تتغيّر كل الفيديوهات القادمة. اطلبه هكذا: «ابنِ shared/Outro.tsx من الشعار في brand والثيم، مدته 90 إطاراً، الشعار يكبر بنعومة ثم يظهر نص المتابعة».

**رفع الثيم**: انسخ الشعار والخطوط (ttf) إلى `brand/` على جهازك، ثم قل: «اقرأ مجلد brand وأنشئ theme.ts منه وسجّل الخطوط». الألوان تكتبها أنت أو تنسخها من Canva أو Figma.

**فيديو مرجعي تريد نسخة مشابهة منه**: Claude لا يشاهد الفيديو مباشرة، فاستخرج له لقطات ونصاً:

```bash
mkdir -p public/refs/frames
ffmpeg -i public/refs/ref.mp4 -vf "fps=1,scale=540:-1" public/refs/frames/f_%03d.jpg
```

ثم قل: «شاهد اللقطات في public/refs/frames وحلّل ترتيب المشاهد وحركة الكاميرا وسرعة الانتقالات وشكل النصوص، ثم ابنِ فيديو بنفس الإيقاع بمحتواي وثيمي». اكتفِ بـ 10 إلى 20 لقطة لتوفر التوكنز. انسخ الأسلوب والبنية فقط، ولا تنسخ محتوى غيرك ولا صوره ولا صوته.

## طريقة الاستخدام خطوة بخطوة

### أولاً: إعداد لمرة واحدة

1. تحقق من `node -v` و`ffmpeg -version` و`claude --version`، وثبّت ما ينقص.
2. أنشئ المشروع: `npx create-video --yes --blank my-videos` ثم `cd my-videos`.
3. ثبّت سكيلز Remotion: `npx remotion skills add`.
4. أنشئ مجلدات `brand` و`src/shared` و`src/videos` و`public/voice`، وضع شعارك وخطوطك في `brand`.
5. اكتب `CLAUDE.md` (القالب في قسم «هيكلة المشروع» أعلاه)، وأضف فيه: «الريلز والستوري 1080×1920، وكل فيديو ينتهي بـ shared/Outro».
6. شغّل `npm run dev` في طرفية، و`claude` في طرفية ثانية داخل نفس المجلد.
7. قل لـ Claude: «اقرأ brand وأنشئ theme.ts، ثم ابنِ shared/Camera.tsx وshared/Caption.tsx وshared/Outro.tsx».
8. أنشئ سكيل `my-video-style` (بطلب من Claude) يجمع قواعد أسلوبك كلها.

### ثانياً: كل فيديو جديد

1. **السكربت**: قل لـ Claude: «اكتب سكربت ريلز مدته 30 ثانية عن \[الموضوع\]، مقسّماً إلى مشاهد، في videos/reel-001/script.txt». راجعه وعدّله.
2. **الصوت**: ولّد التعليق لكل مشهد: `edge-tts --voice ar-SA-HamedNeural --file scene1.txt --write-media public/voice/reel-001-s1.mp3 --write-subtitles public/voice/reel-001-s1.vtt`.
3. **البناء**: «ابنِ videos/reel-001 بمشاهد منفصلة حسب السكربت ومدد الصوت وملفات vtt، بالثيم، مع Camera وCaption وOutro، وسجّله في Root.tsx بمقاس 1080×1920».
4. **المعاينة**: افتح Remotion Studio وشاهد النتيجة مشهداً بمشهد.
5. **التعديل**: طلب واحد في كل مرة ومحدد بالمشهد، مثل: «في المشهد الثالث اجعل الزوم أبطأ وكبّر العنوان».
6. **التصدير**: `npx remotion render src/index.ts Reel001 out/reel-001.mp4`.
7. **المراجعة الأخيرة**: شاهد الملف كاملاً واستمع للنطق، ثم ارفعه.
8. **احفظ الجيد**: إن نجح نمط جديد، قل لـ Claude أن يضيفه إلى `shared/` ويحدّث `CLAUDE.md`.

### حل المشاكل الشائعة

| المشكلة | الحل |
| --- | --- |
| Claude يخترع ألواناً | أعد ذكر قاعدة theme.ts فقط في CLAUDE.md |
| النص العربي مقطّع أو معكوس | اطلب direction: rtl وخطاً يدعم العربية (Cairo أو Tajawal) |
| الصوت لا يتطابق مع المشهد | احسب مدة المشهد من مدة ملف الصوت بالإطارات (الثواني × 30) |
| المعاينة بطيئة | قلّل الدقة في Studio أثناء التعديل وصدّر النسخة الكاملة مرة واحدة |
| Claude يكتب كثيراً ويستهلك توكنز | حدّد الملف باسمه، واستعمل `/clear` بين الفيديوهات |

## المصادر

- [Remotion: Claude Code plugin](https://remotion.dev/docs/ai/claude-code-plugin)
- [Remotion: Agent Skills](https://www.remotion.dev/docs/ai/skills)
- [Tella: How to use Remotion Agent Skills with Claude Code](https://www.tella.com/blog/how-to-use-remotion-agent-skills-with-claude-code)

ملاحظة: معلومات Edge TTS وWhisper وFFmpeg والمكون Camera من معرفتي العامة وليست من مصادر مفتوحة هنا، فجرّبها قبل الاعتماد عليها.
