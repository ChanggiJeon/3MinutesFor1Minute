import string
import random
code_list = string.ascii_letters + '0123456789'
code = ''
for i in range(10):
    code += random.choice(code_list)
print(code)