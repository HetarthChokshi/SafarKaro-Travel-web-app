import jinja2
import pdfkit
import os
from django.conf import settings
from django.template.loader import render_to_string

def generate(context):
    
    print(context)

   # Define the output PDF file path
    pdf_name = f'Booking_Receipt-{context["bookingID"]}.pdf'
    pdf_file_path = os.path.join(settings.BASE_DIR, 'media', 'pdf', pdf_name)

    # Create directories if they don't exist
    os.makedirs(os.path.dirname(pdf_file_path), exist_ok=True)

    html_content = render_to_string('Booking.html', context)
    # print("HTML Content:", html_content)

    # PDF options
    pdf_options = {
        'enable-local-file-access': '',
        'no-stop-slow-scripts': '',
        'quiet': False
    }

    # Get wkhtmltopdf configuration
    pdfkit_config = pdfkit.configuration(wkhtmltopdf=settings.PDFKIT_CONFIG['wkhtmltopdf'])

    # Generate PDF
    try:
        pdfkit.from_string(html_content, pdf_file_path, options=pdf_options, configuration=pdfkit_config)
        print(f"PDF created at: {pdf_file_path}")
    except Exception as e:
        print(f"Error generating PDF: {e}")