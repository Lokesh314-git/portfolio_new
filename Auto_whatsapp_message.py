import pyautogui
import time
import datetime
import uuid
import os
import logging
import json
import threading
from tkinter import *
from tkinter import messagebox, ttk, scrolledtext
import re
from cryptography.fernet import Fernet
import base64
from PIL import Image, ImageTk

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('whatsapp_app.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

# Configure pyautogui
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.5

class WhatsAppApp:
    def __init__(self, root):
        self.root = root
        self.root.title("WhatsApp Automation Tool")
        self.root.geometry("500x650")
        self.root.configure(bg="#f0f0f0")
        self.root.resizable(False, False)
        
        # Generate or load encryption key
        self.encryption_key = self.setup_encryption()
        
        # Style configuration
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self.style.configure("TButton", font=("Helvetica", 11), padding=6)
        self.style.configure("TLabel", font=("Helvetica", 11), background="#f0f0f0")
        self.style.configure("TRadiobutton", font=("Helvetica", 10), background="#f0f0f0")
        self.style.configure("TEntry", font=("Helvetica", 10), padding=5)

        # Title
        title_frame = Frame(root, bg="#128C7E")
        title_frame.pack(fill="x", pady=(0, 10))
        ttk.Label(title_frame, text="WhatsApp Automation Tool", 
                 font=("Helvetica", 18, "bold"), foreground="white", 
                 background="#128C7E").pack(pady=15)

        # Main container
        main_container = Frame(root, bg="#f0f0f0", padx=10, pady=10)
        main_container.pack(fill="both", expand=True)

        # Option selection
        ttk.Label(main_container, text="Select an Option:").pack(pady=5, anchor=W)
        self.option_var = IntVar(value=0)
        options = [
            ("1. Send Messages", 1),
            ("2. View Message History", 2),
            ("3. Save Credentials", 3),
            ("4. Retrieve Credentials", 4),
            ("5. Send Credentials via WhatsApp", 5)
        ]
        
        for text, value in options:
            ttk.Radiobutton(main_container, text=text, variable=self.option_var, 
                           value=value, command=self.option_changed).pack(anchor=W, padx=20, pady=2)

        # Input fields frame
        self.entries_frame = Frame(main_container, bg="#f0f0f0", pady=10)
        self.entries_frame.pack(fill="x", pady=10)

        # Status label
        self.status_var = StringVar(value="Ready")
        status_label = ttk.Label(main_container, textvariable=self.status_var, 
                                font=("Helvetica", 10, "italic"), foreground="blue")
        status_label.pack(pady=5)

        # Buttons frame
        buttons_frame = Frame(main_container, bg="#f0f0f0")
        buttons_frame.pack(pady=10)
        ttk.Button(buttons_frame, text="Execute", command=self.execute_option).pack(side=LEFT, padx=5)
        ttk.Button(buttons_frame, text="Reset", command=self.reset_app).pack(side=LEFT, padx=5)
        ttk.Button(buttons_frame, text="Exit", command=self.safe_exit).pack(side=LEFT, padx=5)
        
        # Add a preview area for messages
        self.preview_text = scrolledtext.ScrolledText(main_container, height=6, width=50, font=("Helvetica", 9))
        self.preview_text.pack(pady=5, fill="x")
        self.preview_text.insert(END, "Message preview will appear here...")
        self.preview_text.config(state=DISABLED)
        
        # Warning label
        self.warning_var = StringVar(value="Use responsibly. Excessive messaging may violate WhatsApp's Terms of Service.")
        warning_label = ttk.Label(main_container, textvariable=self.warning_var, 
                                 font=("Helvetica", 9, "italic"), foreground="red", 
                                 wraplength=450, justify=CENTER)
        warning_label.pack(pady=5)
        
        # Initialize with empty entries
        self.option_changed()

    def setup_encryption(self):
        """Setup encryption for password storage"""
        key_file = "whatsapp_app.key"
        if os.path.exists(key_file):
            with open(key_file, "rb") as f:
                key = f.read()
        else:
            key = Fernet.generate_key()
            with open(key_file, "wb") as f:
                f.write(key)
        return Fernet(key)

    def option_changed(self):
        """Handle option change to update UI"""
        self.clear_entries()
        option = self.option_var.get()
        
        if option == 1:  # Send Messages
            self.setup_message_interface()
        elif option == 2:  # View History
            self.setup_history_interface()
        elif option == 3:  # Save Credentials
            self.setup_save_credentials()
        elif option == 4:  # Retrieve Credentials
            self.setup_retrieve_credentials()
        elif option == 5:  # Send Credentials
            self.setup_send_credentials()

    def setup_message_interface(self):
        """Setup message sending interface"""
        ttk.Label(self.entries_frame, text="Mobile Number (+1234567890):").grid(row=0, column=0, sticky=W, pady=2)
        self.mobile_entry = ttk.Entry(self.entries_frame, width=30)
        self.mobile_entry.grid(row=0, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Label(self.entries_frame, text="Message:").grid(row=1, column=0, sticky=W, pady=2)
        self.message_entry = ttk.Entry(self.entries_frame, width=30)
        self.message_entry.grid(row=1, column=1, sticky=W, pady=2, padx=5)
        self.message_entry.bind("<KeyRelease>", self.update_preview)
        
        ttk.Label(self.entries_frame, text="Message Count (1-50):").grid(row=2, column=0, sticky=W, pady=2)
        self.count_entry = ttk.Entry(self.entries_frame, width=10)
        self.count_entry.grid(row=2, column=1, sticky=W, pady=2, padx=5)
        self.count_entry.insert(0, "1")
        
        ttk.Label(self.entries_frame, text="Delay between messages (seconds):").grid(row=3, column=0, sticky=W, pady=2)
        self.delay_entry = ttk.Entry(self.entries_frame, width=10)
        self.delay_entry.grid(row=3, column=1, sticky=W, pady=2, padx=5)
        self.delay_entry.insert(0, "2")
        
        ttk.Button(self.entries_frame, text="Send Messages", 
                  command=self.send_messages).grid(row=4, column=0, columnspan=2, pady=10)

    def setup_history_interface(self):
        """Setup history viewing interface"""
        ttk.Button(self.entries_frame, text="View Message History", 
                  command=self.show_message_history).pack(pady=5)
        
        ttk.Button(self.entries_frame, text="Clear History", 
                  command=self.clear_message_history).pack(pady=5)

    def setup_save_credentials(self):
        """Setup credentials saving interface"""
        ttk.Label(self.entries_frame, text="Service/Website:").grid(row=0, column=0, sticky=W, pady=2)
        self.service_entry = ttk.Entry(self.entries_frame, width=30)
        self.service_entry.grid(row=0, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Label(self.entries_frame, text="Username/Email:").grid(row=1, column=0, sticky=W, pady=2)
        self.username_entry = ttk.Entry(self.entries_frame, width=30)
        self.username_entry.grid(row=1, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Label(self.entries_frame, text="Password:").grid(row=2, column=0, sticky=W, pady=2)
        self.password_entry = ttk.Entry(self.entries_frame, width=30, show="*")
        self.password_entry.grid(row=2, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Button(self.entries_frame, text="Save Credentials",
                  command=self.save_credentials).grid(row=3, column=0, columnspan=2, pady=10)

    def setup_retrieve_credentials(self):
        """Setup credentials retrieval interface"""
        ttk.Label(self.entries_frame, text="Token Key:").grid(row=0, column=0, sticky=W, pady=2)
        self.retrieve_token_entry = ttk.Entry(self.entries_frame, width=30)
        self.retrieve_token_entry.grid(row=0, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Button(self.entries_frame, text="Retrieve Credentials",
                  command=self.retrieve_credentials).grid(row=1, column=0, columnspan=2, pady=10)
        
        ttk.Button(self.entries_frame, text="List All Services",
                  command=self.list_services).grid(row=2, column=0, columnspan=2, pady=5)

    def setup_send_credentials(self):
        """Setup credentials sending interface"""
        ttk.Label(self.entries_frame, text="Token Key:").grid(row=0, column=0, sticky=W, pady=2)
        self.send_token_entry = ttk.Entry(self.entries_frame, width=30)
        self.send_token_entry.grid(row=0, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Label(self.entries_frame, text="Mobile Number (+1234567890):").grid(row=1, column=0, sticky=W, pady=2)
        self.send_mobile_entry = ttk.Entry(self.entries_frame, width=30)
        self.send_mobile_entry.grid(row=1, column=1, sticky=W, pady=2, padx=5)
        
        ttk.Label(self.entries_frame, text="Delay (seconds):").grid(row=2, column=0, sticky=W, pady=2)
        self.send_delay_entry = ttk.Entry(self.entries_frame, width=10)
        self.send_delay_entry.grid(row=2, column=1, sticky=W, pady=2, padx=5)
        self.send_delay_entry.insert(0, "2")
        
        ttk.Button(self.entries_frame, text="Send Credentials",
                  command=self.send_credentials).grid(row=3, column=0, columnspan=2, pady=10)

    def update_preview(self, event=None):
        """Update the message preview"""
        message = self.message_entry.get() if hasattr(self, 'message_entry') else ""
        count = self.count_entry.get() if hasattr(self, 'count_entry') else "1"
        
        try:
            count = int(count)
            if count > 1:
                preview = f"First message:\n{message}\n\n... followed by {count-1} more identical messages"
            else:
                preview = message
        except:
            preview = message
            
        self.preview_text.config(state=NORMAL)
        self.preview_text.delete(1.0, END)
        self.preview_text.insert(END, preview)
        self.preview_text.config(state=DISABLED)

    def safe_exit(self):
        """Safely exit the application"""
        if messagebox.askyesno("Exit", "Are you sure you want to exit?"):
            self.root.destroy()

    def reset_app(self):
        """Clear inputs and reset to initial state."""
        logging.info("Resetting application")
        self.option_var.set(0)
        self.clear_entries()
        self.status_var.set("Ready")
        
        # Clear preview
        self.preview_text.config(state=NORMAL)
        self.preview_text.delete(1.0, END)
        self.preview_text.insert(END, "Message preview will appear here...")
        self.preview_text.config(state=DISABLED)

    def clear_entries(self):
        """Clear all widgets in the entries frame."""
        for widget in self.entries_frame.winfo_children():
            widget.destroy()

    def validate_mobile(self, mobile):
        """Validate mobile number format."""
        pattern = r"^\+?\d{10,15}$"
        return bool(re.match(pattern, mobile))

    def validate_count(self, count, max_count=50):
        """Validate message count."""
        try:
            count = int(count)
            return 1 <= count <= max_count
        except ValueError:
            return False

    def validate_token(self, token):
        """Validate token format (UUID)."""
        try:
            uuid.UUID(token)
            return True
        except ValueError:
            return False

    def execute_option(self):
        """Handle the selected option."""
        option = self.option_var.get()
        if option == 0:
            messagebox.showwarning("Warning", "Please select an option!")
            self.status_var.set("No option selected")
            return

        self.status_var.set("Executing...")
        logging.info(f"Executing option {option}")

        # Run in a separate thread to prevent UI freezing
        thread = threading.Thread(target=self.execute_option_thread, args=(option,))
        thread.daemon = True
        thread.start()

    def execute_option_thread(self, option):
        """Threaded execution of options"""
        try:
            if option == 1:
                self.send_messages()
            elif option == 2:
                self.show_message_history()
            elif option == 3:
                self.save_credentials()
            elif option == 4:
                self.retrieve_credentials()
            elif option == 5:
                self.send_credentials()
        except Exception as e:
            logging.error(f"Error executing option {option}: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to execute option: {e}"))
            self.root.after(0, lambda: self.status_var.set("Error occurred"))

    def send_messages(self):
        """Send messages via WhatsApp."""
        if not hasattr(self, 'mobile_entry'):
            return
            
        mobile_number = self.mobile_entry.get()
        message = self.message_entry.get()
        message_count = self.count_entry.get()
        delay = self.delay_entry.get()

        if not self.validate_mobile(mobile_number):
            self.root.after(0, lambda: messagebox.showerror("Error", "Enter a valid mobile number (e.g., +1234567890)."))
            self.root.after(0, lambda: self.status_var.set("Invalid mobile number"))
            return
            
        if not message.strip():
            self.root.after(0, lambda: messagebox.showerror("Error", "Message cannot be empty."))
            self.root.after(0, lambda: self.status_var.set("Message is empty"))
            return
            
        if not self.validate_count(message_count):
            self.root.after(0, lambda: messagebox.showerror("Error", f"Enter a valid message count (1-50)."))
            self.root.after(0, lambda: self.status_var.set("Invalid message count"))
            return
            
        try:
            delay = float(delay)
            if not 1 <= delay <= 10:
                raise ValueError
        except ValueError:
            self.root.after(0, lambda: messagebox.showerror("Error", "Enter a valid delay (1-10 seconds)."))
            self.root.after(0, lambda: self.status_var.set("Invalid delay"))
            return

        message_count = int(message_count)
        if message_count > 10:
            response = self.root.after(0, lambda: messagebox.askyesno("Warning", 
                f"Sending {message_count} messages may be considered spam.\n"
                "Continue anyway?"))
            if not response:
                self.root.after(0, lambda: self.status_var.set("Action cancelled"))
                return

        response = self.root.after(0, lambda: messagebox.askyesno("Confirm", 
            f"Send {message_count} messages to {mobile_number}?"))
        if not response:
            self.root.after(0, lambda: self.status_var.set("Action cancelled"))
            return

        self.root.after(0, lambda: self.status_var.set("Opening WhatsApp..."))
        logging.info(f"Sending {message_count} messages to {mobile_number}")

        try:
            # Save to history
            self.save_to_history(mobile_number, message_count, message)

            # Start WhatsApp
            pyautogui.press('win')
            time.sleep(1)
            pyautogui.typewrite('WhatsApp')
            time.sleep(1)
            pyautogui.press('enter')
            time.sleep(5)

            # Search for contact
            pyautogui.click(200, 150)
            pyautogui.typewrite(mobile_number)
            time.sleep(2)
            pyautogui.press('enter')
            time.sleep(5)

            # Click on message box
            pyautogui.click(200, 265)
            time.sleep(1)

            # Send messages
            for i in range(1, message_count + 1):
                self.root.after(0, lambda: self.status_var.set(f"Sending message {i}/{message_count}..."))
                time.sleep(delay)
                pyautogui.typewrite(message)
                time.sleep(0.5)
                pyautogui.press('enter')
                if i % 5 == 0:  # Periodic pause to prevent overload
                    time.sleep(2)

            # Close WhatsApp
            pyautogui.hotkey('alt', 'f4')
            self.root.after(0, lambda: messagebox.showinfo("Success", "Messages sent successfully!"))
            self.root.after(0, lambda: self.status_var.set("Messages sent"))
            logging.info("Messages sent successfully")
            
        except Exception as e:
            logging.error(f"Failed to send messages: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to send messages: {e}"))
            self.root.after(0, lambda: self.status_var.set("Failed to send messages"))

    def save_to_history(self, mobile_number, count, message):
        """Save message details to history file"""
        history_file = "whatsapp_history.json"
        history = []
        
        if os.path.exists(history_file):
            try:
                with open(history_file, 'r') as f:
                    history = json.load(f)
            except:
                history = []
                
        history.append({
            "date": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "mobile": mobile_number,
            "count": count,
            "message": message[:50] + "..." if len(message) > 50 else message
        })
        
        # Keep only last 100 entries
        if len(history) > 100:
            history = history[-100:]
            
        with open(history_file, 'w') as f:
            json.dump(history, f, indent=2)

    def show_message_history(self):
        """Display message history"""
        history_file = "whatsapp_history.json"
        
        if not os.path.exists(history_file):
            self.root.after(0, lambda: messagebox.showinfo("History", "No message history found."))
            self.root.after(0, lambda: self.status_var.set("No history found"))
            return
            
        try:
            with open(history_file, 'r') as f:
                history = json.load(f)
                
            if not history:
                self.root.after(0, lambda: messagebox.showinfo("History", "No message history found."))
                self.root.after(0, lambda: self.status_var.set("No history found"))
                return
                
            # Create history window
            history_win = Toplevel(self.root)
            history_win.title("Message History")
            history_win.geometry("600x400")
            
            # Create text widget with scrollbar
            text_frame = Frame(history_win)
            text_frame.pack(fill=BOTH, expand=True, padx=10, pady=10)
            
            text_widget = scrolledtext.ScrolledText(text_frame, width=70, height=20)
            text_widget.pack(fill=BOTH, expand=True)
            
            # Add history data
            for entry in reversed(history):
                text_widget.insert(END, f"Date: {entry['date']}\n")
                text_widget.insert(END, f"Number: {entry['mobile']}\n")
                text_widget.insert(END, f"Messages: {entry['count']}\n")
                text_widget.insert(END, f"Content: {entry['message']}\n")
                text_widget.insert(END, "-" * 50 + "\n\n")
                
            text_widget.config(state=DISABLED)
            self.root.after(0, lambda: self.status_var.set("History displayed"))
            
        except Exception as e:
            logging.error(f"Error reading history: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Error reading history: {e}"))
            self.root.after(0, lambda: self.status_var.set("Error reading history"))

    def clear_message_history(self):
        """Clear message history"""
        if messagebox.askyesno("Confirm", "Are you sure you want to clear all message history?"):
            history_file = "whatsapp_history.json"
            if os.path.exists(history_file):
                os.remove(history_file)
                self.root.after(0, lambda: messagebox.showinfo("Success", "History cleared."))
                self.root.after(0, lambda: self.status_var.set("History cleared"))
            else:
                self.root.after(0, lambda: messagebox.showinfo("Info", "No history to clear."))
                self.root.after(0, lambda: self.status_var.set("No history found"))

    def save_credentials(self):
        """Save credentials securely."""
        if not hasattr(self, 'service_entry'):
            return
            
        service = self.service_entry.get().strip()
        username = self.username_entry.get().strip()
        password = self.password_entry.get()

        if not service or not username or not password:
            self.root.after(0, lambda: messagebox.showerror("Error", "All fields are required."))
            self.root.after(0, lambda: self.status_var.set("Missing fields"))
            return

        response = self.root.after(0, lambda: messagebox.askyesno("Confirm", "Save these credentials?"))
        if not response:
            self.root.after(0, lambda: self.status_var.set("Action cancelled"))
            return

        try:
            token_key = str(uuid.uuid4())
            
            # Encrypt the password
            encrypted_password = self.encryption_key.encrypt(password.encode()).decode()
            
            # Load existing data
            data_file = "whatsapp_credentials.json"
            data = []
            
            if os.path.exists(data_file):
                try:
                    with open(data_file, 'r') as f:
                        data = json.load(f)
                except:
                    data = []
            
            # Add new entry
            data.append({
                "token": token_key,
                "service": service,
                "username": username,
                "password": encrypted_password,
                "date": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            })
            
            # Save data
            with open(data_file, 'w') as f:
                json.dump(data, f, indent=2)
            
            self.root.after(0, lambda: messagebox.showinfo("Success", 
                f"Credentials saved!\nYour token key is: {token_key}"))
            self.root.after(0, lambda: self.status_var.set("Credentials saved"))
            
            # Clear fields
            self.service_entry.delete(0, END)
            self.username_entry.delete(0, END)
            self.password_entry.delete(0, END)
            
            logging.info(f"Credentials saved for {service}, token: {token_key}")
            
        except Exception as e:
            logging.error(f"Failed to save credentials: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to save credentials: {e}"))
            self.root.after(0, lambda: self.status_var.set("Failed to save credentials"))

    def retrieve_credentials(self):
        """Retrieve stored credentials."""
        if not hasattr(self, 'retrieve_token_entry'):
            return
            
        token_key = self.retrieve_token_entry.get().strip()

        if not self.validate_token(token_key):
            self.root.after(0, lambda: messagebox.showerror("Error", "Enter a valid token key."))
            self.root.after(0, lambda: self.status_var.set("Invalid token"))
            return

        try:
            data_file = "whatsapp_credentials.json"
            if not os.path.exists(data_file):
                self.root.after(0, lambda: messagebox.showerror("Error", "No credentials found."))
                self.root.after(0, lambda: self.status_var.set("No credentials file"))
                return
                
            with open(data_file, 'r') as f:
                data = json.load(f)
                
            for entry in data:
                if entry['token'] == token_key:
                    # Decrypt the password
                    decrypted_password = self.encryption_key.decrypt(entry['password'].encode()).decode()
                    
                    self.root.after(0, lambda: messagebox.showinfo("Credentials", 
                        f"Service: {entry['service']}\nUsername: {entry['username']}\nPassword: {decrypted_password}"))
                    self.root.after(0, lambda: self.status_var.set("Credentials displayed"))
                    logging.info(f"Retrieved credentials for token {token_key}")
                    return
                    
            self.root.after(0, lambda: messagebox.showerror("Error", "Token key not found."))
            self.root.after(0, lambda: self.status_var.set("Token not found"))
            logging.warning(f"Token key not found: {token_key}")
            
        except Exception as e:
            logging.error(f"Error retrieving credentials: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Error retrieving credentials: {e}"))
            self.root.after(0, lambda: self.status_var.set("Error retrieving credentials"))

    def list_services(self):
        """List all stored services"""
        try:
            data_file = "whatsapp_credentials.json"
            if not os.path.exists(data_file):
                self.root.after(0, lambda: messagebox.showinfo("Services", "No services found."))
                return
                
            with open(data_file, 'r') as f:
                data = json.load(f)
                
            if not data:
                self.root.after(0, lambda: messagebox.showinfo("Services", "No services found."))
                return
                
            services_win = Toplevel(self.root)
            services_win.title("Stored Services")
            services_win.geometry("400x300")
            
            text_frame = Frame(services_win)
            text_frame.pack(fill=BOTH, expand=True, padx=10, pady=10)
            
            text_widget = scrolledtext.ScrolledText(text_frame, width=50, height=15)
            text_widget.pack(fill=BOTH, expand=True)
            
            for entry in data:
                text_widget.insert(END, f"Service: {entry['service']}\n")
                text_widget.insert(END, f"Username: {entry['username']}\n")
                text_widget.insert(END, f"Token: {entry['token']}\n")
                text_widget.insert(END, f"Date: {entry['date']}\n")
                text_widget.insert(END, "-" * 30 + "\n\n")
                
            text_widget.config(state=DISABLED)
            
        except Exception as e:
            logging.error(f"Error listing services: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Error listing services: {e}"))

    def send_credentials(self):
        """Send credentials via WhatsApp."""
        if not hasattr(self, 'send_token_entry'):
            return
            
        token_key = self.send_token_entry.get().strip()
        mobile_number = self.send_mobile_entry.get().strip()
        delay = self.send_delay_entry.get()

        if not self.validate_token(token_key):
            self.root.after(0, lambda: messagebox.showerror("Error", "Enter a valid token key."))
            self.root.after(0, lambda: self.status_var.set("Invalid token"))
            return
            
        if not self.validate_mobile(mobile_number):
            self.root.after(0, lambda: messagebox.showerror("Error", "Enter a valid mobile number (e.g., +1234567890)."))
            self.root.after(0, lambda: self.status_var.set("Invalid mobile number"))
            return
            
        try:
            delay = float(delay)
            if not 1 <= delay <= 10:
                raise ValueError
        except ValueError:
            self.root.after(0, lambda: messagebox.showerror("Error", "Enter a valid delay (1-10 seconds)."))
            self.root.after(0, lambda: self.status_var.set("Invalid delay"))
            return

        response = self.root.after(0, lambda: messagebox.askyesno("Confirm", 
            f"Send credentials to {mobile_number}?"))
        if not response:
            self.root.after(0, lambda: self.status_var.set("Action cancelled"))
            return

        self.root.after(0, lambda: self.status_var.set("Opening WhatsApp..."))
        logging.info(f"Sending credentials to {mobile_number} for token {token_key}")

        try:
            data_file = "whatsapp_credentials.json"
            if not os.path.exists(data_file):
                self.root.after(0, lambda: messagebox.showerror("Error", "No credentials found."))
                self.root.after(0, lambda: self.status_var.set("No credentials file"))
                return
                
            with open(data_file, 'r') as f:
                data = json.load(f)
                
            for entry in data:
                if entry['token'] == token_key:
                    # Decrypt the password
                    decrypted_password = self.encryption_key.decrypt(entry['password'].encode()).decode()
                    
                    # Start WhatsApp
                    pyautogui.press('win')
                    time.sleep(1)
                    pyautogui.typewrite('WhatsApp')
                    time.sleep(1)
                    pyautogui.press('enter')
                    time.sleep(5)

                    # Search for contact
                    pyautogui.click(200, 150)
                    pyautogui.typewrite(mobile_number)
                    time.sleep(2)
                    pyautogui.press('enter')
                    time.sleep(5)

                    # Click on message box
                    pyautogui.click(200, 265)
                    time.sleep(1)

                    # Send service info
                    pyautogui.typewrite(f"Service: {entry['service']}")
                    time.sleep(0.5)
                    pyautogui.press('enter')
                    time.sleep(delay)

                    # Send username
                    pyautogui.typewrite(f"Username: {entry['username']}")
                    time.sleep(0.5)
                    pyautogui.press('enter')
                    time.sleep(delay)

                    # Send password
                    pyautogui.typewrite(f"Password: {decrypted_password}")
                    time.sleep(0.5)
                    pyautogui.press('enter')

                    # Close WhatsApp
                    pyautogui.hotkey('alt', 'f4')
                    self.root.after(0, lambda: messagebox.showinfo("Success", "Credentials sent successfully!"))
                    self.root.after(0, lambda: self.status_var.set("Credentials sent"))
                    logging.info("Credentials sent successfully")
                    return
                    
            self.root.after(0, lambda: messagebox.showerror("Error", "Token key not found."))
            self.root.after(0, lambda: self.status_var.set("Token not found"))
            logging.warning(f"Token key not found: {token_key}")
            
        except Exception as e:
            logging.error(f"Failed to send credentials: {e}")
            self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to send credentials: {e}"))
            self.root.after(0, lambda: self.status_var.set("Failed to send credentials"))

if __name__ == "__main__":
    root = Tk()
    app = WhatsAppApp(root)
    root.mainloop()