// Urdu / English switch.
// The app is written in English. When Urdu is on, a small translation layer swaps every
// on-screen English phrase for its Urdu version (text, placeholders, tooltips), and the
// layout switches to right-to-left. Numbers stay in English digits for easy reading.
// To add or fix a translation, edit DICT below (exact English text → Urdu).

const DICT = {
  // navigation & layout
  Dashboard: 'ڈیش بورڈ', Inventory: 'انوینٹری', Products: 'مصنوعات', Orders: 'آرڈرز', History: 'ہسٹری', Settings: 'سیٹنگز',
  Company: 'کمپنی', 'Sign out': 'لاگ آؤٹ', Menu: 'مینو', 'Stock alerts': 'اسٹاک الرٹس', 'All stock levels are healthy': 'تمام اسٹاک ٹھیک ہے',
  'Search history: order no., SKU, item…': 'ہسٹری میں تلاش: آرڈر نمبر، SKU، آئٹم…', 'Last activity': 'آخری سرگرمی',

  // login
  'Welcome back': 'خوش آمدید', 'Sign in': 'سائن ان', Email: 'ای میل', Password: 'پاس ورڈ',
  'Demo accounts: tap to sign in': 'ڈیمو اکاؤنٹس: سائن اِن کے لیے ٹیپ کریں',
  'Run your whole factory': 'اپنی پوری فیکٹری چلائیں', 'from one dashboard.': 'ایک ڈیش بورڈ سے۔',
  'Track raw materials, plan production, manage orders and keep a full audit trail. Real time, from any device.': 'خام مال کا حساب رکھیں، پروڈکشن پلان کریں، آرڈرز سنبھالیں اور مکمل ریکارڈ رکھیں۔ ہر ڈیوائس سے، فوری۔',
  'Live dashboard': 'لائیو ڈیش بورڈ', 'Inventory & BOM': 'انوینٹری اور BOM', 'Sales & purchase orders': 'سیل اور خریداری آرڈرز', 'Complete history': 'مکمل ہسٹری',
  'Use one of the demo accounts below (any password of 4+ characters).': 'نیچے دیے گئے ڈیمو اکاؤنٹ استعمال کریں (کم از کم 4 حروف کا پاس ورڈ)۔',

  // roles
  Admin: 'ایڈمن', 'Store Manager': 'اسٹور مینیجر', 'Production Supervisor': 'پروڈکشن سپروائزر', Sales: 'سیلز', Viewer: 'ویور',
  'Full access, including settings and users': 'مکمل رسائی، سیٹنگز اور یوزرز سمیت',
  'Inventory, purchase orders, receiving stock': 'انوینٹری، خریداری آرڈرز، اسٹاک وصولی',
  'Products, BOM and production runs': 'مصنوعات، BOM اور پروڈکشن',
  'Sales orders and customers': 'سیل آرڈرز اور گاہک', 'Read-only access to dashboards and reports': 'صرف ڈیش بورڈ اور رپورٹس دیکھنے کی رسائی',

  // dashboard
  'Good morning': 'صبح بخیر', 'Good afternoon': 'سہ پہر بخیر', 'Good evening': 'شام بخیر',
  'Record production': 'پروڈکشن درج کریں', 'New order': 'نیا آرڈر', 'Sales this month': 'اس مہینے کی سیل', 'Open orders': 'کھلے آرڈرز',
  'Inventory value': 'انوینٹری کی مالیت', 'Low stock items': 'کم اسٹاک آئٹمز', 'Needs reordering': 'دوبارہ منگوانا ہے', 'All healthy': 'سب ٹھیک ہے',
  'vs same period last month': 'پچھلے مہینے اسی مدت کے مقابلے میں', 'vs last mo.': 'پچھلے ماہ سے',
  'Last 30 days': 'پچھلے 30 دن', 'Last 7 days': 'پچھلے 7 دن', 'All time': 'تمام عرصہ',
  'Open orders by status': 'کھلے آرڈرز بلحاظ اسٹیٹس', 'Sales orders not yet delivered': 'وہ سیل آرڈرز جو ابھی ڈیلیور نہیں ہوئے', orders: 'آرڈرز',
  'Production output': 'پروڈکشن', Produce: 'پروڈیوس کریں', 'Low stock': 'کم اسٹاک', 'All stock levels healthy ✅': 'تمام اسٹاک ٹھیک ہے ✅',
  'Orders due soon': 'جلد ڈیو آرڈرز', 'All orders': 'تمام آرڈرز', 'No open orders': 'کوئی کھلا آرڈر نہیں', 'Recent activity': 'حالیہ سرگرمی', 'Full history': 'مکمل ہسٹری',
  Material: 'خام مال', Product: 'پروڈکٹ', Overdue: 'تاخیر شدہ', Due: 'ڈیو', Bags: 'بوریاں',

  // inventory
  'Raw materials and finished goods in stock': 'اسٹاک میں خام مال اور تیار مال', Export: 'ایکسپورٹ', 'Export CSV': 'CSV ایکسپورٹ',
  'Add material': 'خام مال شامل کریں', Materials: 'خام مال', 'Below minimum': 'کم از کم سے نیچے', 'Stock value': 'اسٹاک کی مالیت',
  'Raw materials': 'خام مال', 'Finished goods': 'تیار مال', 'Search name, SKU or location': 'نام، SKU یا جگہ سے تلاش کریں',
  'All categories': 'تمام کیٹیگریز', 'Low stock only': 'صرف کم اسٹاک', Item: 'آئٹم', Category: 'کیٹیگری', Level: 'لیول',
  'In stock': 'اسٹاک میں', Min: 'کم از کم', 'Unit cost': 'فی یونٹ لاگت', Value: 'مالیت', Status: 'اسٹیٹس', Actions: 'ایکشنز',
  'Out of stock': 'اسٹاک ختم', 'Stock in': 'اسٹاک اِن', 'Stock out': 'اسٹاک آؤٹ', Edit: 'ترمیم', Delete: 'حذف کریں', 'Delete?': 'حذف کریں؟',
  'No items found': 'کوئی آئٹم نہیں ملا', 'Try a different search or filter': 'کوئی اور تلاش یا فلٹر آزمائیں',
  'Edit material': 'خام مال میں ترمیم', 'Add raw material': 'خام مال شامل کریں', Name: 'نام', Unit: 'یونٹ', 'Opening stock': 'ابتدائی اسٹاک',
  'Minimum level': 'کم از کم لیول', Supplier: 'سپلائر', Location: 'جگہ', 'Save material': 'خام مال محفوظ کریں',
  Current: 'موجودہ', Adding: 'شامل', Removing: 'نکال رہے ہیں', After: 'بعد میں', Reason: 'وجہ',
  'Purchase received': 'خریداری وصول ہوئی', 'Production return': 'پروڈکشن سے واپسی', 'Stock count correction': 'اسٹاک گنتی کی درستگی', Other: 'دیگر',
  'Issued to production': 'پروڈکشن کو جاری', 'Damaged / scrap': 'خراب / اسکریپ', Sample: 'نمونہ',
  "You can't remove more than what's in stock.": 'اسٹاک سے زیادہ نہیں نکالا جا سکتا۔', 'Add to stock': 'اسٹاک میں شامل کریں', 'Remove from stock': 'اسٹاک سے نکالیں',
  'e.g. Silo 1, Bag store A': 'مثلاً سائلو 1، بوری اسٹور A',

  // products
  'Finished goods catalogue, bills of materials and production': 'تیار مال کی فہرست، اجزاء کی ترکیب اور پروڈکشن',
  'Add product': 'پروڈکٹ شامل کریں', 'Bags in stock': 'اسٹاک میں بوریاں', 'Avg. margin': 'اوسط منافع', 'Search products': 'مصنوعات تلاش کریں',
  All: 'سب', Margin: 'منافع', 'No products found': 'کوئی پروڈکٹ نہیں ملی', 'Quantity to produce (bags)': 'کتنی بوریاں بنانی ہیں',
  'Materials required': 'درکار خام مال', 'Unknown material': 'نامعلوم خام مال',
  'No bill of materials set. Edit the product to add materials.': 'اجزاء کی ترکیب نہیں بنی۔ پروڈکٹ میں ترمیم کر کے خام مال شامل کریں۔',
  'Not enough material for this quantity. Reduce the quantity or receive stock first.': 'اس مقدار کے لیے خام مال کافی نہیں۔ مقدار کم کریں یا پہلے اسٹاک منگوائیں۔',
  'Complete production': 'پروڈکشن مکمل کریں', 'Materials are deducted and finished stock is added. Logged in History.': 'خام مال کم ہو جاتا ہے اور تیار مال بڑھ جاتا ہے۔ ہسٹری میں درج ہو جاتا ہے۔',
  'Edit product': 'پروڈکٹ میں ترمیم', 'New product': 'نئی پروڈکٹ', 'Minimum stock': 'کم از کم اسٹاک', 'Bill of materials': 'اجزاء کی ترکیب',
  '· per 1 unit': '· فی ایک یونٹ', 'No materials yet. Add the materials used to make one unit.': 'ابھی کوئی خام مال نہیں۔ ایک یونٹ بنانے میں لگنے والا مال شامل کریں۔',
  'Select material…': 'خام مال منتخب کریں…', 'Material cost per unit': 'فی یونٹ خام مال کی لاگت', 'Save product': 'پروڈکٹ محفوظ کریں', Qty: 'مقدار',

  // orders
  'Sales orders to customers and purchase orders to vendors': 'گاہکوں کے سیل آرڈرز اور وینڈرز کے خریداری آرڈرز',
  'New sales order': 'نیا سیل آرڈر', 'New purchase order': 'نیا خریداری آرڈر', 'Sales orders': 'سیل آرڈرز', 'Purchase orders': 'خریداری آرڈرز',
  Open: 'کھلے', 'Total value': 'کل مالیت', Order: 'آرڈر', Date: 'تاریخ', Customer: 'گاہک', Vendor: 'وینڈر', Items: 'آئٹمز', Total: 'کل',
  item: 'آئٹم', items: 'آئٹمز', 'No orders found': 'کوئی آرڈر نہیں ملا', 'Try another filter or create a new order': 'کوئی اور فلٹر آزمائیں یا نیا آرڈر بنائیں',
  'This order was cancelled.': 'یہ آرڈر منسوخ کر دیا گیا۔', 'Order date': 'آرڈر کی تاریخ', 'Due date': 'ڈیو تاریخ', Price: 'قیمت', Amount: 'رقم',
  Subtotal: 'ذیلی کل', 'Sales tax': 'سیلز ٹیکس', 'Not enough finished stock to dispatch': 'ڈسپیچ کے لیے تیار مال کافی نہیں',
  'Record production on the Products page first.': 'پہلے مصنوعات کے صفحے پر پروڈکشن درج کریں۔', 'Cancel order': 'آرڈر منسوخ کریں',
  'Dispatching deducts finished goods from stock.': 'ڈسپیچ کرنے سے تیار مال اسٹاک سے کم ہو جاتا ہے۔',
  'Receiving adds the materials to stock.': 'وصولی سے خام مال اسٹاک میں شامل ہو جاتا ہے۔',
  'Every change is recorded in History.': 'ہر تبدیلی ہسٹری میں درج ہوتی ہے۔',
  'Vendor / supplier': 'وینڈر / سپلائر', 'Add new': 'نیا شامل کریں', 'Add new customer': 'نیا گاہک شامل کریں', 'Add new vendor': 'نیا وینڈر شامل کریں',
  'Delivery due': 'ڈیلیوری کی تاریخ', 'Expected delivery': 'متوقع ڈیلیوری', 'New customer': 'نیا گاہک', 'New vendor': 'نیا وینڈر',
  'Name *': 'نام *', City: 'شہر', Phone: 'فون', 'Save & select': 'محفوظ کریں اور منتخب کریں', Cancel: 'منسوخ', 'Add line': 'لائن شامل کریں',
  'Notes (optional)': 'نوٹس (اختیاری)', 'Delivery instructions, packing, payment terms…': 'ڈیلیوری ہدایات، پیکنگ، ادائیگی کی شرائط…',
  'Create order': 'آرڈر بنائیں', 'Select product…': 'پروڈکٹ منتخب کریں…', 'No customers yet': 'ابھی کوئی گاہک نہیں', 'No vendors yet': 'ابھی کوئی وینڈر نہیں',
  'Customer added': 'گاہک شامل ہو گیا', 'Vendor added': 'وینڈر شامل ہو گیا',

  // statuses
  Pending: 'زیرِ التوا', 'In production': 'پروڈکشن میں', Ready: 'تیار', Dispatched: 'روانہ', Delivered: 'ڈیلیور ہو گیا', Cancelled: 'منسوخ',
  Draft: 'ڈرافٹ', Ordered: 'آرڈر دیا گیا', Received: 'وصول ہو گیا',

  // history
  'Complete audit trail of stock movements, production, orders and changes': 'اسٹاک، پروڈکشن، آرڈرز اور تبدیلیوں کا مکمل ریکارڈ',
  Entries: 'اندراجات', 'Stock in / out': 'اسٹاک اِن / آؤٹ', 'Bags produced': 'تیار شدہ بوریاں', 'Search order no., SKU, item, user…': 'آرڈر نمبر، SKU، آئٹم، یوزر سے تلاش…',
  'All users': 'تمام یوزرز', 'All activity': 'تمام سرگرمی', Production: 'پروڈکشن', Changes: 'تبدیلیاں', 'No activity found': 'کوئی سرگرمی نہیں ملی',
  'Try a wider date range or a different filter': 'زیادہ دنوں کی رینج یا کوئی اور فلٹر آزمائیں', Today: 'آج', Yesterday: 'کل',
  'Load more': 'مزید دکھائیں', remaining: 'باقی',
  'Order created': 'آرڈر بنایا گیا', 'Purchase order created': 'خریداری آرڈر بنایا گیا', 'Production completed': 'پروڈکشن مکمل', 'Stock added': 'اسٹاک شامل کیا',
  'Stock removed': 'اسٹاک نکالا', 'Material added': 'خام مال شامل کیا', 'Material updated': 'خام مال اپ ڈیٹ کیا', 'Material deleted': 'خام مال حذف کیا',
  'Product added': 'پروڈکٹ شامل کی', 'Product updated': 'پروڈکٹ اپ ڈیٹ کی', 'Product deleted': 'پروڈکٹ حذف کی', 'Settings updated': 'سیٹنگز اپ ڈیٹ کیں',
  'Finished goods dispatched': 'تیار مال روانہ کیا', 'Raw material received': 'خام مال وصول ہوا', 'Manual adjustment': 'دستی تبدیلی',
  'Details edited': 'تفصیلات تبدیل کیں', 'New product created': 'نئی پروڈکٹ بنائی', 'Removed from catalogue': 'فہرست سے ہٹا دیا',
  'Removed from inventory': 'انوینٹری سے ہٹا دیا', 'Company settings saved': 'کمپنی سیٹنگز محفوظ', 'Materials consumed per BOM': 'ترکیب کے مطابق خام مال استعمال ہوا',
  System: 'سسٹم',

  // settings
  'Company profile, contacts, users and data': 'کمپنی پروفائل، رابطے، یوزرز اور ڈیٹا', 'Customers & vendors': 'گاہک اور وینڈرز',
  'Users & roles': 'یوزرز اور رولز', 'Data & backup': 'ڈیٹا اور بیک اپ', 'Company profile': 'کمپنی پروفائل',
  'Shown in the sidebar and on order documents': 'سائیڈبار اور آرڈر کاغذات پر دکھایا جاتا ہے', 'Company name': 'کمپنی کا نام', Tagline: 'ٹیگ لائن', Address: 'پتہ',
  'Orders, tax & currency': 'آرڈرز، ٹیکس اور کرنسی', Currency: 'کرنسی', 'Sales tax (%)': 'سیلز ٹیکس (%)', 'Sales order prefix': 'سیل آرڈر سابقہ',
  'Purchase order prefix': 'خریداری آرڈر سابقہ', Notifications: 'نوٹیفکیشنز', 'Low-stock alerts': 'کم اسٹاک الرٹس',
  'Show a warning when an item drops below its minimum level': 'جب کوئی آئٹم کم از کم لیول سے نیچے جائے تو وارننگ دکھائیں',
  'Save changes': 'تبدیلیاں محفوظ کریں', 'Settings saved': 'سیٹنگز محفوظ ہو گئیں', Customers: 'گاہک', 'Vendors (suppliers)': 'وینڈرز (سپلائرز)',
  Add: 'شامل کریں', saved: 'محفوظ', Save: 'محفوظ کریں', Saved: 'محفوظ ہو گیا', 'Add user': 'یوزر شامل کریں', 'Edit user': 'یوزر میں ترمیم',
  'Who can sign in and what they can do': 'کون سائن اِن کر سکتا ہے اور کیا کر سکتا ہے', You: 'آپ', 'Full name': 'پورا نام', Role: 'رول',
  'Save user': 'یوزر محفوظ کریں', 'User saved': 'یوزر محفوظ ہو گیا', 'Remove?': 'ہٹائیں؟',
  'Backup & restore': 'بیک اپ اور ریسٹور', 'Download all data as a file, or restore from a backup': 'سارا ڈیٹا فائل میں ڈاؤن لوڈ کریں یا بیک اپ سے واپس لائیں',
  'Download backup (.json)': 'بیک اپ ڈاؤن لوڈ کریں (.json)', 'Restore from backup': 'بیک اپ سے واپس لائیں', 'History entries': 'ہسٹری اندراجات',
  'Backup restored successfully.': 'بیک اپ کامیابی سے بحال ہو گیا۔', 'Backup restored': 'بیک اپ بحال ہو گیا', 'That file is not a valid Factora backup.': 'یہ فائل درست بیک اپ نہیں ہے۔',
  'Reset demo data': 'ڈیمو ڈیٹا ری سیٹ کریں', 'Restore the original sample factory data': 'اصل نمونہ ڈیٹا واپس لائیں',
  'Click again to reset everything': 'سب کچھ ری سیٹ کرنے کے لیے دوبارہ کلک کریں', 'Demo data restored': 'ڈیمو ڈیٹا بحال ہو گیا',
  'About this installation': 'اس انسٹالیشن کے بارے میں', 'Data mode': 'ڈیٹا موڈ', 'Demo: stored in this browser': 'ڈیمو: اسی براؤزر میں محفوظ', Version: 'ورژن',
  'In demo mode each browser keeps its own copy of the data. To share live data between users and devices, connect a backend such as PocketBase or Supabase (see README).': 'ڈیمو موڈ میں ہر براؤزر اپنا الگ ڈیٹا رکھتا ہے۔ سب یوزرز اور ڈیوائسز میں ایک ہی ڈیٹا کے لیے PocketBase یا Supabase جیسا بیک اینڈ جوڑیں (README دیکھیں)۔',
  'Confirm?': 'تصدیق کریں؟', Language: 'زبان',

  // categories, units & seed data
  materials: 'خام مال', 'can make': 'مزید بن سکتی ہیں', more: '',
  '· min': '· کم از کم', 'Sign in to': 'سائن اِن کریں:', Max: 'زیادہ سے زیادہ', of: 'میں سے', 'Load more (': 'مزید دکھائیں (', 'remaining)': 'باقی)', 'orders ·': 'آرڈرز ·',
  'Bags produced, last 30 days ·': 'پچھلے 30 دن میں تیار بوریاں ·', 'bags this month': 'بوریاں اس مہینے',
  Atta: 'آٹا', Maida: 'میدہ', Fine: 'فائن', Chokar: 'چوکر', Grain: 'اناج', Consumables: 'متفرق سامان',
  'Atta · Maida · Fine · Chokar': 'آٹا · میدہ · فائن · چوکر',
  kg: 'کلو', pcs: 'عدد', bags: 'بوریاں', spools: 'ریل', L: 'لیٹر', tons: 'ٹن', rolls: 'رول',
  'Wheat (gandum)': 'گندم', 'Bag stitching thread': 'بوری سلائی دھاگہ', 'Diesel (generator)': 'ڈیزل (جنریٹر)',
  'Silo 1 & 2': 'سائلو 1 اور 2', 'Bag store A': 'بوری اسٹور A', 'Bag store B': 'بوری اسٹور B', 'Packing hall': 'پیکنگ ہال', 'Fuel tank': 'فیول ٹینک',
  'Golden Harvest Flour Mills': 'گولڈن ہارویسٹ فلور ملز', 'Industrial Estate, Lahore': 'انڈسٹریل اسٹیٹ، لاہور',
  Lahore: 'لاہور', Faisalabad: 'فیصل آباد', Gujranwala: 'گوجرانوالہ', Sheikhupura: 'شیخوپورہ', Kasur: 'قصور', Okara: 'اوکاڑہ',
}

const MONTHS = { January: 'جنوری', February: 'فروری', March: 'مارچ', April: 'اپریل', May: 'مئی', June: 'جون', July: 'جولائی', August: 'اگست', September: 'ستمبر', October: 'اکتوبر', November: 'نومبر', December: 'دسمبر',
  Jan: 'جنوری', Feb: 'فروری', Mar: 'مارچ', Apr: 'اپریل', Jun: 'جون', Jul: 'جولائی', Aug: 'اگست', Sep: 'ستمبر', Oct: 'اکتوبر', Nov: 'نومبر', Dec: 'دسمبر',
  Monday: 'پیر', Tuesday: 'منگل', Wednesday: 'بدھ', Thursday: 'جمعرات', Friday: 'جمعہ', Saturday: 'ہفتہ', Sunday: 'اتوار' }

const PRODUCT_WORDS = { Atta: 'آٹا', Maida: 'میدہ', Fine: 'فائن', Chokar: 'چوکر', 'PP bag': 'پی پی بوری' }

// Patterns for text that contains numbers or names.
const PATTERNS = [
  [/^(Atta|Maida|Fine|Chokar|PP bag) (\d+) kg$/, (m, a, n) => `${PRODUCT_WORDS[a]} ${n} کلو`],
  [/^(Good morning|Good afternoon|Good evening), (.+)$/, (m, g, n) => `${DICT[g]}، ${n}`],
  [/^Here's what's happening at (.+) today\.$/, (m, c) => `${tr(c)} میں آج کیا ہو رہا ہے، یہ دیکھیں۔`],
  [/^(\d+) due in 3 days$/, (m, n) => `${n} اگلے 3 دن میں ڈیو`],
  [/^(\d+) materials · (\d+) products$/, (m, a, b) => `${a} خام مال · ${b} مصنوعات`],
  [/^([\d,.]+) (\w+) left \(min ([\d,.]+)\)$/, (m, q, u, mn) => `${q} ${tr(u)} باقی (کم از کم ${mn})`],
  [/^(.+) is low$/, (m, n) => `${tr(n)} کم ہے`],
  [/^(.+) stock low$/, (m, n) => `${tr(n)} کا اسٹاک کم ہے`],
  [/^(\d+) item\(s\)$/, (m, n) => `${n} آئٹمز`],
  [/^(\d+) materials$/, (m, n) => `${n} خام مال`],
  [/^can make$/, () => 'مزید بن سکتی ہیں'],
  [/^more$/, () => ''],
  [/^Max ([\d,]+)$/, (m, n) => `زیادہ سے زیادہ ${n}`],
  [/^min ([\d,.]+) (.+)$/, (m, n, u) => `کم از کم ${n} ${tr(u)}`],
  [/^Min ([\d,.]+) · (.+)$/, (m, n, v) => `کم از کم ${n} · ${v}`],
  [/^of ([\d,.]+) (.*)$/, (m, n, u) => `${n} ${tr(u)} میں سے`],
  [/^Produce · (.+)$/, (m, n) => `پروڈیوس · ${tr(n)}`],
  [/^Stock in · (.+)$/, (m, n) => `اسٹاک اِن · ${tr(n)}`],
  [/^Stock out · (.+)$/, (m, n) => `اسٹاک آؤٹ · ${tr(n)}`],
  [/^Quantity \((.+)\)$/, (m, u) => `مقدار (${tr(u)})`],
  [/^Unit cost \((.+)\)$/, (m, c) => `فی یونٹ لاگت (${c})`],
  [/^Selling price \((.+)\)$/, (m, c) => `فروخت کی قیمت (${c})`],
  [/^Sales tax \((\d+)%\)$/, (m, n) => `سیلز ٹیکس (${n}%)`],
  [/^(Sales|Purchase) order (.+)$/, (m, t, n) => `${t === 'Sales' ? 'سیل' : 'خریداری'} آرڈر ${n}`],
  [/^Mark as (.+)$/, (m, s) => `${tr(s.charAt(0).toUpperCase() + s.slice(1))} کے طور پر نشان لگائیں`],
  [/^Search order no\. or (customer|vendor)$/, (m, w) => `آرڈر نمبر یا ${w === 'customer' ? 'گاہک' : 'وینڈر'} سے تلاش`],
  [/^Select (product|material)…$/, (m, w) => `${w === 'product' ? 'پروڈکٹ' : 'خام مال'} منتخب کریں…`],
  [/^([\d,]+) orders · (\d+)\/(\d+)$/, (m, a, b, c) => `${a} آرڈرز · ${b}/${c}`],
  [/^(.+): need ([\d,]+), have ([\d,]+)$/, (m, n, a, b) => `${tr(n)}: ضرورت ${a}، موجود ${b}`],
  [/^Load more \((\d+) remaining\)$/, (m, n) => `مزید دکھائیں (${n} باقی)`],
  [/^(\d+) saved$/, (m, n) => `${n} محفوظ`],
  [/^Status → (.+)$/, (m, s) => `اسٹیٹس → ${tr(s)}`],
  [/^Order marked (.+)$/, (m, s) => `آرڈر ${tr(s.charAt(0).toUpperCase() + s.slice(1))} نشان زد`],
  [/^Opening stock ([\d,.]+) (.+)$/, (m, n, u) => `ابتدائی اسٹاک ${n} ${tr(u)}`],
  [/^Produced ([\d,]+) × (.+)$/, (m, n, p) => `${n} × ${tr(p)} تیار ہو گئیں`],
  [/^(.+) deleted$/, (m, n) => `${tr(n)} حذف ہو گیا`],
  [/^(.+) → (.+)$/, (m, a, b) => `${a} → ${tr(b)}`],
  [/^(\d+)m ago$/, (m, n) => `${n} منٹ پہلے`],
  [/^(\d+)h ago$/, (m, n) => `${n} گھنٹے پہلے`],
  [/^(\d+)d ago$/, (m, n) => `${n} دن پہلے`],
  [/^just now$/, () => 'ابھی'],
  [/^Overdue ·$/, () => 'تاخیر شدہ ·'],
  [/^(Edit|Add) (customer|supplier)$/, (m, a, k) => `${k === 'customer' ? 'گاہک' : 'وینڈر'} ${a === 'Edit' ? 'میں ترمیم' : 'شامل کریں'}`],
  [/^Last activity (.+)$/, (m, t) => `آخری سرگرمی ${tr(t)}`],
]

const cache = new Map()
const MONTH_RE = new RegExp(`\\b(${Object.keys(MONTHS).join('|')})\\b`, 'g')
// Only multi-word phrases are swapped inside longer text, so names like "City Traders" or "Lahore Bakers" stay intact.
const PHRASES = Object.keys(DICT).filter((k) => k.includes(' ') && /^[A-Z]/.test(k)).sort((a, b) => b.length - a.length)
const PHRASE_RE = new RegExp(`(?<![A-Za-z])(${PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![A-Za-z])`, 'g')

export function tr(text) {
  if (!text || !/[A-Za-z]/.test(text)) return text
  if (cache.has(text)) return cache.get(text)
  const lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0]
  const core = text.trim()
  let out = DICT[core]
  if (out === undefined) {
    for (const [re, fn] of PATTERNS) { const m = core.match(re); if (m) { out = fn(...m); break } }
  }
  if (out === undefined && /^·\s/.test(core)) out = '· ' + tr(core.replace(/^·\s+/, ''))
  if (out === undefined && core.includes(' · ')) out = core.split(' · ').map((p) => tr(p)).join(' · ')
  if (out === undefined) {
    // dates and longer sentences: swap month/day names and known phrases inside the text
    let s = core.replace(MONTH_RE, (w) => MONTHS[w]).replace(/\bAM\b/g, 'صبح').replace(/\bPM\b/g, 'شام')
    s = s.replace(PHRASE_RE, (w) => DICT[w])
    s = s.replace(/\b(\d[\d,.]*) (kg|pcs|bags|spools|L)\b/g, (m, n, u) => `${n} ${DICT[u]}`)
    out = s
  }
  const res = lead + out + trail
  if (cache.size > 5000) cache.clear()
  cache.set(text, res)
  return res
}

// ---------- DOM translator ----------
let observer = null
const ATTRS = ['placeholder', 'title', 'aria-label']
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE'])

function trNode(node) {
  if (node.nodeType === 3) {
    const p = node.parentElement
    if (!p || SKIP.has(p.tagName) || p.closest('[data-no-tr]')) return
    const v = node.nodeValue
    const t = tr(v)
    if (t !== v) node.nodeValue = t
  } else if (node.nodeType === 1) {
    if (SKIP.has(node.tagName) || node.hasAttribute('data-no-tr')) return
    for (const a of ATTRS) { const v = node.getAttribute(a); if (v) { const t = tr(v); if (t !== v) node.setAttribute(a, t) } }
    const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
    let n = w.nextNode()
    while (n) {
      if (n.nodeType === 3) trNode(n)
      else for (const a of ATTRS) { const v = n.getAttribute(a); if (v) { const t = tr(v); if (t !== v) n.setAttribute(a, t) } }
      n = w.nextNode()
    }
  }
}

export function applyLanguage(lang) {
  const html = document.documentElement
  observer?.disconnect()
  observer = null
  html.lang = lang === 'ur' ? 'ur' : 'en'
  html.dir = lang === 'ur' ? 'rtl' : 'ltr'
  html.classList.toggle('lang-ur', lang === 'ur')
  if (lang !== 'ur') return
  trNode(document.body)
  observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') trNode(m.target)
      else if (m.type === 'attributes') trNode(m.target.nodeType === 1 ? m.target : m.target.parentElement)
      else m.addedNodes.forEach((n) => trNode(n))
    }
  })
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS })
}
