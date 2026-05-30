# Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: "PowerShell 6+ is not available"
**Problem**: Running npm commands fails with PowerShell error

**Solution**:
1. Use Command Prompt (cmd) instead of PowerShell
2. Or install PowerShell Core from: https://aka.ms/powershell
3. Run commands using:
   ```bash
   cd "path\to\project"
   npm run dev
   ```

---

### Issue 2: Port 5173 already in use
**Problem**: Dev server fails to start, port is in use

**Solution**:
1. Vite will auto-assign next available port (check console)
2. Or manually kill the process:
   ```bash
   taskkill /F /IM node.exe
   ```
3. Or specify a custom port:
   ```bash
   npm run dev -- --port 3000
   ```

---

### Issue 3: Module not found errors
**Problem**: "Cannot find module" or "Module resolution" errors

**Solution**:
1. Reinstall dependencies:
   ```bash
   npm install
   ```
2. Clear node_modules and reinstall:
   ```bash
   rm -r node_modules package-lock.json
   npm install
   ```
3. Check all imports are correct (case-sensitive on Linux/Mac)

---

### Issue 4: Styles not loading
**Problem**: App loads but styles look broken/missing

**Solution**:
1. Restart dev server
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Check index.css is imported in main.jsx
5. Verify tailwind.config.js is configured

---

### Issue 5: React components not rendering
**Problem**: Blank page or components missing

**Solution**:
1. Check browser console for errors (F12)
2. Verify all imports in components
3. Check file paths (especially on Windows with backslashes)
4. Make sure component files exist:
   ```bash
   ls src/pages/
   ls src/components/
   ```
5. Verify App.jsx routes are correct

---

### Issue 6: Authentication not working
**Problem**: Login page shows but login doesn't work

**Solution**:
1. Check browser console for errors
2. Open DevTools → Storage → LocalStorage
3. Verify key `aiman_user` exists after login
4. Try clearing localStorage:
   ```javascript
   localStorage.clear()
   ```
5. Check AuthContext is properly provided in App.jsx

---

### Issue 7: localStorage data lost
**Problem**: Data disappears after refresh or browser restart

**This is normal for demo mode**. localStorage is cleared when:
- Browser cache is cleared
- "Clear browsing data" is used
- Private/Incognito mode is closed
- Cookies are cleared

**Solution**: This is expected behavior. To persist data:
1. Implement backend API
2. Use a real database
3. Or connect to Firebase/Supabase

---

### Issue 8: Sidebar not showing on mobile
**Problem**: Sidebar doesn't appear on mobile devices

**Solution**:
1. Click hamburger menu (≡) in top-left
2. Sidebar should slide in from left
3. Click outside or X to close
4. If still not working:
   - Check browser console for JS errors
   - Try different mobile resolution (DevTools)
   - Hard refresh the page

---

### Issue 9: Images/icons not loading
**Problem**: Icons from Lucide React not showing

**Solution**:
1. Verify lucide-react is installed:
   ```bash
   npm list lucide-react
   ```
2. If missing, install it:
   ```bash
   npm install lucide-react
   ```
3. Check icon names are correct (case-sensitive)
4. Restart dev server

---

### Issue 10: Form validation not showing
**Problem**: Form errors don't display

**Solution**:
1. Check formErrors state in component
2. Verify error message JSX is there
3. Try submitting invalid data to trigger errors
4. Check console for any warnings
5. Verify Tailwind color classes are in safelist if using custom config

---

## Database (localStorage) Issues

### Checking stored data:
```javascript
// In browser console:
localStorage.getItem('aiman_user')          // Check user
localStorage.getItem('aiman_claims')        // Check claims
localStorage.getItem('aiman_reviews')       // Check reviews
```

### Clearing specific data:
```javascript
localStorage.removeItem('aiman_user')       // Clear user
localStorage.removeItem('aiman_claims')     // Clear claims
localStorage.removeItem('aiman_reviews')    // Clear reviews
```

### Resetting everything:
```javascript
localStorage.clear()                        // Clear all
```

---

## Performance Issues

### Issue: App is slow
**Solution**:
1. Check for large assets being loaded
2. Monitor network tab in DevTools
3. Look for unnecessary re-renders
4. Profile with React DevTools
5. Check for blocking operations

---

## Build Issues

### Issue: npm run build fails
**Solution**:
```bash
# Clean and rebuild
npm run build -- --clean

# Or full clean install
rm -r dist node_modules package-lock.json
npm install
npm run build
```

---

## Development Tips

### Enable React DevTools:
1. Install React DevTools browser extension
2. Check component tree
3. Inspect state/props
4. Profile performance

### Enable Redux DevTools (if added):
```javascript
// DevTools will show state changes
```

### Console debugging:
```javascript
console.log('value:', value)              // Log values
console.table(array)                      // Pretty print arrays
console.error('Error:', error)            // Log errors
console.time('timer')                     // Start timer
console.timeEnd('timer')                  // End timer
```

---

## Network Troubleshooting

### Check if API would work (future):
```javascript
// Test API connectivity
fetch('http://your-api.com/claims')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

---

## Browser Compatibility

### Recommended browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Check browser version:
```javascript
console.log(navigator.userAgent)
```

---

## Getting Help

### Check these files:
- `QUICK_START.md` - Getting started
- `IMPLEMENTATION_GUIDE.md` - Feature details
- Component source code - Implementation examples

### Questions to research:
1. Search React documentation
2. Check Tailwind CSS docs
3. Look for React Router examples
4. Check Lucide React icon names

---

## Advanced Debugging

### Enable source maps (already done in Vite):
Source maps are enabled by default in dev mode.

### Debug localStorage directly:
```javascript
// Create a persistent log
window.debugLog = []
window.addEventListener('storage', (e) => {
  window.debugLog.push({time: new Date(), key: e.key, value: e.newValue})
  console.table(window.debugLog)
})
```

### Monitor React re-renders:
Install React DevTools and use Profiler tab.

---

## Still Having Issues?

1. Check browser console (F12) for errors
2. Review the error message carefully
3. Check this guide for similar issues
4. Review file modifications in version control
5. Restart development server completely
6. Try a different browser
7. Clear all cache and reinstall dependencies

---

## Emergency Fixes

### If everything is broken:
```bash
# 1. Kill all node processes
taskkill /F /IM node.exe

# 2. Clean install
rm -r node_modules package-lock.json
npm install

# 3. Clear cache
npm cache clean --force

# 4. Start fresh
npm run dev
```

### If browsers is stuck:
- Clear browsing data (Ctrl+Shift+Delete)
- Clear localStorage: `localStorage.clear()` in console
- Hard refresh: Ctrl+Shift+R or Cmd+Shift+R

---

Remember: Most issues are resolved by:
1. Restarting the dev server
2. Hard refreshing the browser
3. Clearing cache and reinstalling dependencies

Good luck! 🚀
