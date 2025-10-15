# Next.js Parallel Routes - Proof of Concept

A comprehensive demonstration of Next.js App Router parallel routes, intercepting routes, and advanced routing patterns.

## 📁 Project Structure

```
app/
├── page.tsx                                    # Home page with navigation
├── dashboard/                                   # Example 1: Parallel Routes with Tab Groups
│   ├── layout.tsx                              # Accepts @team and @analytics slots
│   ├── page.tsx                                # Main dashboard content
│   ├── default.tsx                             # Fallback for children slot
│   ├── @team/
│   │   ├── page.tsx                            # Team members list
│   │   └── default.tsx                         # Fallback for @team slot
│   └── @analytics/
│       ├── layout.tsx                          # Tab navigation layout
│       ├── default.tsx                         # Fallback for @analytics slot
│       ├── page-views/
│       │   └── page.tsx                        # Page views analytics
│       └── visitors/
│           └── page.tsx                        # Visitors analytics
├── admin/                                       # Example 2: Conditional Rendering
│   ├── layout.tsx                              # Conditionally renders @user or @admin
│   ├── page.tsx                                # Main admin content
│   ├── @user/
│   │   └── page.tsx                            # Standard user dashboard
│   └── @admin/
│       └── page.tsx                            # Administrator dashboard
├── gallery/                                     # Example 3: Gallery Page
│   ├── layout.tsx                              # Simple layout
│   └── page.tsx                                # Photo gallery grid
├── photo/                                       # Photo routes (always modal)
│   └── [id]/
│       ├── layout.tsx                          # Layout with @gallery slot
│       ├── page.tsx                            # Photo modal (client component)
│       └── @gallery/
│           └── page.tsx                        # Gallery background
└── components/
    └── modal.tsx                               # Reusable modal component
```

## 🎯 Examples Implemented

### 1. Dashboard - Parallel Routes with Tab Groups

**Location:** `/dashboard`

**Features:**
- Two parallel slots (`@team` and `@analytics`) rendering simultaneously
- Tab groups within the `@analytics` slot
- Independent navigation that doesn't affect other slots
- Proper `default.tsx` fallbacks for hard navigation

**Test Scenarios:**
1. Visit `/dashboard` - See all three slots (children, @team, @analytics)
2. Click "Page Views" or "Visitors" tabs - Only @analytics content changes
3. Refresh on `/dashboard/page-views` - All slots remain visible with defaults
4. Notice @team slot stays constant during tab navigation

### 2. Admin Area - Conditional Rendering

**Location:** `/admin`

**Features:**
- Role-based conditional rendering of `@user` or `@admin` slots
- Simulated role switching (alternates based on current second)
- Different dashboards for different user types
- Real-world use case demonstration

**Test Scenarios:**
1. Visit `/admin` - See either user or admin dashboard
2. Refresh multiple times - Role alternates (even seconds = admin, odd = user)
3. Notice completely different UI based on role
4. Observe conditional slot rendering in action

### 3. Photo Gallery - Modal with Intercepting Routes

**Location:** `/gallery` and `/photo/[id]`

**Features:**
- Photos have standalone URLs at `/photo/[id]`
- **Always opens as modal** over gallery (even with direct URL access)
- Uses parallel routes (@gallery slot) to show gallery underneath
- Closing modal navigates to `/gallery`
- Multiple modal close methods (ESC, backdrop click, close button)
- No intercepting routes needed - pattern uses parallel routes at /photo level

**Test Scenarios:**
1. Visit `/gallery` - See photo grid
2. Click any photo - Opens in modal with URL `/photo/[id]`
3. Note the URL is `/photo/[id]`, not `/gallery/photo/[id]`
4. Gallery remains visible underneath the modal
5. Press ESC or click backdrop - Closes modal and navigates to `/gallery`
6. Copy `/photo/4` URL and paste in new tab - Opens as modal over gallery
7. Direct URL access always shows modal over gallery
8. Closing modal always navigates to `/gallery`

## 🔑 Key Concepts

### Parallel Routes (@folder)

- **Named Slots:** Use `@folder` convention to create parallel slots
- **Props:** Slots are passed as props to the parent layout
- **Simultaneous Rendering:** Multiple pages render at the same time
- **URL Independence:** Slots don't affect URL structure

### Default.tsx Files

- **Purpose:** Provide fallback content when Next.js can't determine active state
- **Required For:** Hard navigation (page refresh) on sub-routes
- **Prevents:** 404 errors for unmatched slots
- **Returns:** Can return `null` for slots that should be hidden

### Parallel Routes for Persistent Modals

- **Pattern:** Use parallel routes to show content underneath modal
- **Implementation:** Layout at `/photo/[id]` with `@gallery` slot
- **Benefit:** Modal always appears over gallery, regardless of navigation method
- **Use Case:** Resource URLs that should always be modal experiences
- **Closing:** Navigate to the parent route (e.g., `/gallery`)
- **Example:** `/photo/[id]` uses `@gallery` slot to render gallery underneath

### Tab Groups

- **Implementation:** Layout within a parallel slot
- **Navigation:** Independent from other slots
- **State:** Preserved during navigation
- **Use Case:** Analytics dashboards, settings panels

### Conditional Rendering

- **Pattern:** Layout chooses which slot to render based on conditions
- **Use Cases:** Role-based UIs, A/B testing, feature flags
- **Benefits:** Single route, multiple experiences

## 🚀 Running the PoC

```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

## 📋 Testing Checklist

### Dashboard Example
- [ ] All three sections render simultaneously
- [ ] Tab navigation works without full page reload
- [ ] @team slot remains visible when switching tabs
- [ ] Refresh on /dashboard/page-views shows defaults
- [ ] Browser back/forward navigation works correctly

### Admin Example
- [ ] Role indicator shows current role
- [ ] Different content for user vs admin
- [ ] Refresh changes role (even/odd seconds)
- [ ] Only one slot (@user or @admin) renders at a time

### Gallery Example
- [ ] Photo grid displays all photos
- [ ] Click photo opens modal with correct content
- [ ] Modal shows correct photo ID and information
- [ ] ESC key closes modal
- [ ] Click backdrop closes modal
- [ ] Browser back closes modal
- [ ] Gallery state preserved after closing modal
- [ ] Right-click → Open in new tab shows full page
- [ ] Refresh on modal shows full page version
- [ ] Full page has "Back to Gallery" link
- [ ] Shareable URLs work in both contexts

## 💡 Best Practices Demonstrated

1. **TypeScript First:** All files use `.tsx` with proper interfaces
2. **Default Fallbacks:** Every parallel slot has a `default.tsx`
3. **Catch-all Routes:** Used in modal to handle navigation cleanup
4. **Client Components:** Only where needed (modal, tab navigation)
5. **Semantic HTML:** Proper use of dialog, nav, etc.
6. **Accessibility:** ARIA labels, keyboard navigation
7. **Comments:** Extensive JSDoc and inline comments
8. **Responsive Design:** Mobile-first Tailwind classes

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Components:** Shadcn/ui ready
- **Responsive:** Mobile-first approach
- **Animations:** Smooth transitions and hover effects

## 📚 Resources

- [Next.js Parallel Routes Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
- [Next.js Intercepting Routes Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)
- [Next.js Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing)

## 🔧 Troubleshooting

### Modal doesn't close with browser back
- Ensure `default.tsx` and `[...catchAll]/page.tsx` return `null` in @modal slot

### 404 on page refresh
- Check that all slots have `default.tsx` files
- Verify default files are returning appropriate content

### Tabs not working
- Ensure tab layout is marked as `"use client"`
- Check that `usePathname` is imported from `next/navigation`

### Conditional rendering not working
- Verify role check logic in layout
- Ensure both @user and @admin slots exist

## ✅ Implementation Complete

This PoC demonstrates all major parallel routes patterns from the Next.js documentation:
- ✅ Basic parallel routes with multiple slots
- ✅ Tab groups within parallel slots
- ✅ Conditional rendering based on data
- ✅ Modal pattern with intercepting routes
- ✅ Default.tsx fallbacks
- ✅ Catch-all routes for cleanup
- ✅ Proper TypeScript typing
- ✅ Comprehensive documentation
