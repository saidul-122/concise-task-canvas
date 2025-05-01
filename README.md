
# TaskTracker - Project and Task Management Application

TaskTracker is a comprehensive task management application built with React and TypeScript that helps you organize projects, track tasks, and manage your workflow. With an intuitive interface and powerful features, TaskTracker makes it easy to stay productive and keep your projects on track.

## ✨ Features

- **User Authentication**: Secure sign-up and login system with email and password
- **Project Management**: Create and manage up to 4 projects per user
- **Task Organization**: Create, update, and delete tasks within your projects
- **Progress Tracking**: Monitor task progress with visual status indicators:
  - 📋 To Do
  - ⏳ In Progress
  - 🔍 In Review
  - ✅ Done
- **Dashboard Overview**: Get a quick view of your tasks and projects at a glance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Live Demo

Check out the live demo of TaskTracker [here](https://task-tracker-demo.com).

## 🛠️ Tech Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Static typing for safer and more maintainable code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality UI components built on Radix UI primitives
- **React Router Dom**: For navigation and routing
- **React Query**: For efficient data fetching and state management
- **Local Storage**: For data persistence (simulating a backend)
- **date-fns**: Modern JavaScript date utility library

## 📋 Application Structure

```
src/
├── components/      # Reusable UI components
│   ├── auth/        # Authentication-related components
│   ├── layout/      # Layout components (Header, Sidebar)
│   ├── projects/    # Project-related components
│   ├── tasks/       # Task-related components
│   └── ui/          # UI components from shadcn/ui
├── contexts/        # React context providers
├── pages/           # Page components
├── types/           # TypeScript types and interfaces
└── lib/             # Utility functions and helpers
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

2. Install dependencies:

```sh
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📱 Usage Guide

### User Authentication
1. Create a new account with email, password, name, and country
2. Log in with your credentials
3. Access your personalized dashboard

### Project Management
1. Create new projects (up to 4) from your dashboard
2. View all your projects in the Projects tab
3. Edit project details or delete projects as needed

### Task Management
1. Add tasks to your projects with title, description, and status
2. Update task status as you make progress
3. View tasks by project or see all your tasks in one place
4. Track completion dates for finished tasks

## 🔄 Workflow Example

1. Create a project called "Website Redesign"
2. Add tasks like "Design mockups", "Develop homepage", "Test responsive layout"
3. Set the initial status for each task (e.g., "To Do")
4. As you work, update task statuses to "In Progress", "In Review", and "Done"
5. Monitor your progress on the dashboard

## 🧩 Future Enhancements

- Team collaboration features
- File attachments for tasks
- Task priority levels and deadlines
- Email notifications for task updates
- Advanced filtering and search capabilities
- Time tracking integration
- Mobile applications for iOS and Android

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [React Query](https://tanstack.com/query) for data management
- [Lucide Icons](https://lucide.dev/) for the icon set

---

Created with ❤️ by Saidul Hoque
