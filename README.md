# JHA Arabia Company Website

A professional static website for JHA Arabia Co., Ltd., the Saudi Arabian subsidiary of Beijing Jinghang'an Technology Co., Ltd.

## Website Structure

- **index.html** - Homepage with company overview and service highlights
- **about.html** - Company history, mission, vision, and leadership
- **services.html** - Detailed service offerings and technical capabilities
- **projects.html** - Project portfolio with filtering functionality
- **contact.html** - Contact information and inquiry form

## Features

- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Fast Performance** - Static HTML/CSS/JS for quick loading
- **Accessibility** - Semantic HTML and ARIA labels
- **Cross-browser Compatibility** - Works on all modern browsers

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, custom properties
- **JavaScript** - Vanilla JS for interactivity
- **Font Awesome** - Icon library
- **Google Fonts** - Roboto and Open Sans fonts

## Deployment Instructions

### Option 1: GitHub Pages (Current Setup)
1. Create a new GitHub repository
2. Push this code to the repository
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be available at `https://username.github.io/repository`

### Option 2: IONOS Hosting (Recommended for www.jha-arabia.com)
1. Log in to IONOS control panel
2. Go to Domain Management for jha-arabia.com
3. Update DNS A record to point to hosting server IP
4. Upload all files to web hosting directory
5. Enable SSL certificate

### Option 3: Static Hosting With External Form Backend
1. Keep the site on GitHub Pages or move it to another static host
2. Connect the contact form to Formspree, Getform, a serverless function, or your own backend
3. Keep the custom domain pointed at the chosen host
4. Verify SSL and form-delivery behavior after deployment

## Domain Configuration

The domain www.jha-arabia.com is currently registered with IONOS. To connect the website:

1. **IONOS DNS Configuration**:
   - A Record: @ → [hosting server IP]
   - A Record: www → [hosting server IP]
   - CNAME Record: (if using CDN)

2. **SSL Certificate**:
   - Most hosting providers offer free Let's Encrypt SSL
   - Enable HTTPS for security and SEO

## Content Management

This is a static website. To update content:

1. Edit HTML files directly
2. Update CSS in `css/style.css`
3. Update JavaScript in `js/main.js`
4. Replace images in `images/` directory

For frequent content updates, consider migrating to a CMS like WordPress or using a static site generator.

## Image Requirements

Placeholder images are used. Replace with actual company images:
- Company logo
- Project photos
- Team photos
- Office location photos

Recommended image sizes:
- Hero images: 1920x1080px
- Project thumbnails: 800x600px
- Team photos: 400x400px

## Contact Form

The contact form on `contact.html` is currently configured for GitHub Pages friendly use.

1. It opens a prefilled email draft for `info@jha-arabia.com`
2. If you want direct form submission, connect it to Formspree, a serverless function, or your own backend
3. Keep the current UI and replace the mailto behavior only when the backend is ready

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Performance Optimization

- Images are optimized for web
- CSS and JS are minified
- Fonts are loaded from CDN
- No external dependencies except Font Awesome and Google Fonts

## SEO Considerations

- Semantic HTML structure
- Meta tags in head section
- Responsive design
- Fast loading speed
- SSL certificate
- Social media meta tags (to be added)

## Future Enhancements

1. Arabic language version
2. Blog/news section
3. Project case studies
4. Client testimonials
5. Interactive project map
6. Newsletter subscription
7. Careers page
8. Downloadable resources

## License

This website is proprietary to JHA Arabia Co., Ltd.
