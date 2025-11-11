from tkinter import *

root = Tk()
root.title("Calculator")

input_field = Entry(root, width=50, font=("Helvetica", 10))
input_field.grid(row=0, column=0, columnspan=4, padx=15, pady=15)

def click(num):
    current = input_field.get()
    input_field.delete(0, END)
    input_field.insert(0, str(current) + str(num))

def clear():
    current = input_field.get()
    if "" in current:
        input_field.delete(0, END)
    else:
        input_field.delete(len(current)-1, END)

def equal():
    try:
        result = eval(input_field.get())
        input_field.delete(0, END)
        input_field.insert(0, str(result) + "")
    except Exception as e:
        input_field.delete(0, END)
        input_field.insert(0, "Error")

b1 = Button(root, text="1", padx=50, pady=25, command=lambda: click(1))
b2 = Button(root, text="2", padx=50, pady=25, command=lambda: click(2))
b3 = Button(root, text="3", padx=50, pady=25, command=lambda: click(3))
b4 = Button(root, text="4", padx=50, pady=25, command=lambda: click(4))
b5 = Button(root, text="5", padx=50, pady=25, command=lambda: click(5))
b6 = Button(root, text="6", padx=50, pady=25, command=lambda: click(6))
b7 = Button(root, text="7", padx=50, pady=25, command=lambda: click(7))
b8 = Button(root, text="8", padx=50, pady=25, command=lambda: click(8))
b9 = Button(root, text="9", padx=50, pady=25, command=lambda: click(9))
b0 = Button(root, text="0", padx=50, pady=25, command=lambda: click(0))
b_add = Button(root, text="+", padx=48, pady=25, command=lambda: click("+"))
b_sub = Button(root, text="-", padx=50, pady=25, command=lambda: click("-"))
b_mult = Button(root, text="*", padx=50, pady=25, command=lambda: click("*"))
b_div = Button(root, text="/", padx=50, pady=25, command=lambda: click("/"))
b_ac = Button(root, text="AC", padx=45, pady=25, command=clear)
b_eq = Button(root, text="=", padx=50, pady=25, command=equal)

b1.grid(row=1, column=0)
b2.grid(row=1, column=1)
b3.grid(row=1, column=2)
b_add.grid(row=1, column=3)
b4.grid(row=2, column=0)
b5.grid(row=2, column=1)
b6.grid(row=2, column=2)
b_sub.grid(row=2, column=3)
b7.grid(row=3, column=0)
b8.grid(row=3, column=1)
b9.grid(row=3, column=2)
b_mult.grid(row=3, column=3)
b0.grid(row=4, column=0)
b_ac.grid(row=4, column=1)
b_eq.grid(row=4, column=2)
b_div.grid(row=4, column=3)

root.mainloop()