# Quick Start Guide - AIMan Knowledge Commons

## Installation & Setup

```bash
# 1. Navigate to project directory
cd "c:\Users\bakki\OneDrive\Desktop\AIMan Knowledge commons App\Aiman-knowledge-commons"

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Usually: http://localhost:5173
```

## Testing the Application

### First-Time User Flow:
1. Visit the landing page
2. Click "Get Started"
3. On Login page, click "Sign Up"
4. Fill in:
   - Email: `test@example.com`
   - Full Name: `John Doe`
   - Role: `Knowledge Contributor`
   - Password: `password123`
5. Click "Create Account"
6. Redirected to Dashboard (empty initially)

### Submit a Claim:
1. Click "Submit Claim" in sidebar
2. Fill form with test data:
   - Title: "Local Weather Pattern"
   - Category: "Field Observation"
   - Description: "Temperature tends to drop 5°C in evening around 6 PM in this region. Observed for past 30 days consistently."
   - Why Useful: "Could improve weather prediction models"
   - Evidence Link: "https://example.com/weather-data"
   - Location: "Bangalore, India"
   - Observation Date: Today
   - Upload File: Optional
   - Your Name: Auto-filled
   - Consent: Check the box
3. Click "Submit Knowledge Claim"
4. See success message
5. Redirected to claim detail page

### View Dashboard:
1. Go to Dashboard
2. See submitted claim with:
   - Knowledge Score (calculated)
   - Category badge
   - Status badge
   - Submission date
3. Click on claim to view full details
4. See status timeline on the right

### Test Reviewer Role:
1. Logout and register new account
2. During signup, select "Reviewer/Admin" role
3. Go to "Review Queue" (should be in sidebar for reviewers)
4. Select a claim from the list
5. Provide review:
   - Move score slider
   - Select AI usefulness type
   - Add comments
6. Click one of:
   - "Approve & Verify" (makes claim status = verified)
   - "Request More Evidence" (makes claim status = needs-more-evidence)
   - "Reject" (makes claim status = rejected)
7. Claim moves to "Reviewed" tab
8. In user's dashboard, they'll see the new status

## Features to Test

### ✅ Authentication
- [ ] Login with existing credentials
- [ ] Register new account
- [ ] User profile shows in navbar
- [ ] Logout button works
- [ ] Protected pages redirect to login if not authenticated

### ✅ Form & Validation
- [ ] Form validation shows errors in red
- [ ] Knowledge score updates as you type
- [ ] AI suggestions change based on category and score
- [ ] Form status sidebar updates in real-time
- [ ] Submit button disabled until required fields filled

### ✅ Dashboard
- [ ] Claims display with correct status badges
- [ ] Filter by status works
- [ ] Filter by category works
- [ ] Search by title/description works
- [ ] Statistics show correct counts
- [ ] Click claim card to view details

### ✅ Claim Details
- [ ] All claim information displays correctly
- [ ] Status timeline shows progression
- [ ] Evidence links are clickable
- [ ] Reviewer comments show if available
- [ ] Back button returns to dashboard

### ✅ Reviewer Dashboard
- [ ] Queue tab shows pending claims
- [ ] Reviewed tab shows completed reviews
- [ ] Select claim shows review panel
- [ ] Reviewer score slider works
- [ ] AI usefulness dropdown has options
- [ ] All three decision buttons functional
- [ ] Decisions update claim status correctly

### ✅ Navigation
- [ ] Sidebar opens/closes on mobile
- [ ] Active page highlighted in sidebar
- [ ] User menu dropdown works
- [ ] Logo links back appropriately
- [ ] All links navigate correctly

### ✅ UI/UX
- [ ] Animations play smoothly
- [ ] Hover effects work on buttons and cards
- [ ] Mobile layout responsive
- [ ] Dark theme consistent
- [ ] Loading states display
- [ ] Success messages show

## Troubleshooting

### Port already in use?
If 5173 is already in use, Vite will use the next available port. Check console output.

### localStorage not working?
- Check browser console for errors
- Clear localStorage: `localStorage.clear()` in console
- Restart dev server

### Styles not loading?
- Run: `npm run build`
- Clear browser cache
- Restart dev server

### Components not rendering?
- Check browser console for JavaScript errors
- Verify all imports are correct
- Check component file paths

## Development Notes

### Component Organization:
- Pages are in `src/pages/`
- Reusable components in `src/components/`
- Context providers in `src/context/`
- Utilities in `src/utils/`

### Styling:
- Tailwind CSS for utility classes
- Custom CSS in `src/index.css` for animations
- Glass morphism design for modern look
- Gradient text for headings

### State Management:
- Auth state: `AuthContext`
- Claims data: `ClaimsContext`
- Local component state: `useState`

### Storage:
- User info: `storageService.setUser/getUser`
- Claims: `storageService.setClaims/getClaims`
- All stored as JSON in localStorage

## Performance Tips

- Sidebar is mobile-optimized (hidden by default)
- Sticky headers for easy scrolling
- Smooth animations with CSS transitions
- Lazy component rendering
- Efficient re-renders with proper dependencies

## Code Quality

- ESLint configured for consistency
- Run: `npm run lint` to check
- Follow existing component patterns
- Use custom hooks for logic reuse

## Next Steps

After testing, consider:
1. Connect to backend API
2. Add real authentication
3. Implement email notifications
4. Add advanced search/filtering
5. Create admin dashboard
6. Add data export functionality
7. Setup CI/CD pipeline
8. Add unit tests

---

Happy testing! 🚀
