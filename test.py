import openpyxl
import arabic_reshaper
from bidi.algorithm import get_display

file_name = "data.xlsx"
workbook = openpyxl.load_workbook(file_name)
sheet = workbook.active

title = arabic_reshaper.reshape("--- معدلات التلاميذ والملاحظات ---")
print(get_display(title))

for row_number in range(9, 15):
    first_name = sheet[f'C{row_number}'].value
    last_name = sheet[f'B{row_number}'].value
    
    evaluation = sheet[f'E{row_number}'].value or 0
    test = sheet[f'F{row_number}'].value or 0
    exam = sheet[f'G{row_number}'].value or 0
    
    if first_name and last_name:
        # 1. حساب المعدل
        continuous_assessment = (evaluation + test) / 2
        subject_average = (continuous_assessment + (exam * 2)) / 3
        final_average = round(subject_average, 2)
        
        # 2. تحديد الملاحظة التربوية بناءً على فئة المعدل
        if final_average >= 18.00:
            observation = "ممتاز"
        elif final_average >= 16.00:
            observation = "جيد جداً"
        elif final_average >= 14.00:
            observation = "جيد"
        elif final_average >= 12.00:
            observation = "قريب من الجيد / نتائج حسنة"
        elif final_average >= 10.00:
            observation = "متوسط / نتائج مقبولة"
        elif final_average >= 8.00:
            observation = "دون المتوسط / عليك بمضاعفة المجهود"
        elif final_average >= 5.00:
            observation = "ضعيف"
        else:
            observation = "ضعيف جداً"

        # 3. تجهيز الجملة للطباعة
        student_info = f"{first_name} {last_name} | المعدل: {final_average} | الملاحظة: {observation}"
        
        # معالجة اللغة العربية
        reshaped_info = arabic_reshaper.reshape(student_info)
        bidi_info = get_display(reshaped_info)
        
        print(bidi_info)
