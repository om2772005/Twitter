import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources: {
      en: {
        translation: {
          home: "Home",
          explore: "Explore",
          notifications: "Notifications",
          messages: "Messages",
          bookmarks: "Bookmarks",
          profile: "Profile",
          tweet: "Tweet",
          subscribe: "Subscribe",
          changeLanguage: "Change Language",
          addAccount: "Add an existing account",
          logout: "Log out",
          welcome: "Welcome",
          whatsHappening: "What's Happening",
          post: "Post",
          showPosts: "Show posts",
          loadingPosts: "Loading posts...",
          exploreUsers: "Explore Users",
          followers: "Followers:",
          following: "Following:",
          viewProfile: "View Profile",
          noUsersFound: "No users found.",
          follow: "Follow",
          unfollow: "Unfollow",
          editProfile: "Edit Profile",
          joined: "📅 Joined",
          posts: "Posts",
          noPostsAvailable: "No posts available",
          everyoneCanReply: "Everyone can reply",
          drafts: "Drafts",
          requestOtpAudio: "Request OTP for Audio Upload",
          posting: "Posting...",
          editYourProfile: "Edit Your Profile",
          name: "Name",
          bio: "Bio",
          location: "Location",
          website: "Website",
          saveChanges: "Save Changes",
          chooseTweetPlan: "Choose Your Tweet Plan",
          perMonth: "/ month",
          tweetsAllowed: "Tweets Allowed:",
          subscribeNow: "Subscribe Now"




        }
      },
      hi: {
        translation: {
          home: "होम",
          explore: "अन्वेषण करें",
          notifications: "सूचनाएं",
          messages: "संदेश",
          bookmarks: "बुकमार्क्स",
          profile: "प्रोफ़ाइल",
          tweet: "ट्वीट करें",
          subscribe: "सदस्यता लें",
          changeLanguage: "भाषा बदलें",
          addAccount: "मौजूदा खाता जोड़ें",
          logout: "लॉग आउट",
          welcome: "स्वागत है",
          whatsHappening: "क्या हो रहा है",
          post: "पोस्ट करें",
          showPosts: "पोस्ट्स दिखाएं",
          loadingPosts: "पोस्ट लोड हो रहे हैं...",
          exploreUsers: "उपयोगकर्ताओं की खोज करें",
          followers: "अनुयायी:",
          following: "अनुकरण कर रहे हैं:",
          viewProfile: "प्रोफ़ाइल देखें",
          noUsersFound: "कोई उपयोगकर्ता नहीं मिला।",
          follow: "अनुसरण करें",
          unfollow: "अधिकार हटाएं",
          editProfile: "प्रोफ़ाइल संपादित करें",
          joined: "📅 जुड़ा हुआ",
          posts: "पोस्ट्स",
          noPostsAvailable: "कोई पोस्ट उपलब्ध नहीं है",
          everyoneCanReply: "हर कोई जवाब दे सकता है",
          drafts: "ड्राफ्ट्स",
          requestOtpAudio: "ऑडियो अपलोड के लिए ओटीपी अनुरोध करें",
          posting: "पोस्ट किया जा रहा है...",
          editYourProfile: "अपनी प्रोफ़ाइल संपादित करें",
          name: "नाम",
          bio: "बायो",
          location: "स्थान",
          website: "वेबसाइट",
          saveChanges: "परिवर्तनों को सहेजें",
          chooseTweetPlan: "अपनी ट्वीट योजना चुनें",
          perMonth: "/ महीना",
          tweetsAllowed: "अनुमत ट्वीट्स:",
          subscribeNow: "अब सदस्यता लें"






        }
      },
      es: {
        translation: {
          home: "Inicio",
          explore: "Explorar",
          notifications: "Notificaciones",
          messages: "Mensajes",
          bookmarks: "Marcadores",
          profile: "Perfil",
          tweet: "Tuitear",
          subscribe: "Suscribirse",
          changeLanguage: "Cambiar idioma",
          addAccount: "Agregar una cuenta existente",
          logout: "Cerrar sesión",
          welcome: "Bienvenido",
          whatsHappening: "Qué está pasando",
          post: "Publicar",
          showPosts: "Ver publicaciones",
          loadingPosts: "Cargando publicaciones...",
          exploreUsers: "Explorar usuarios",
          followers: "Seguidores:",
          following: "Siguiendo:",
          viewProfile: "Ver perfil",
          noUsersFound: "No se encontraron usuarios.",
          follow: "Seguir",
          unfollow: "Dejar de seguir",
          editProfile: "Editar perfil",
          joined: "📅 Unido",
          posts: "Publicaciones",
          noPostsAvailable: "No hay publicaciones disponibles",
          everyoneCanReply: "Todos pueden responder",
          drafts: "Borradores",
          requestOtpAudio: "Solicitar OTP para cargar audio",
          posting: "Publicando...",
          editYourProfile: "Editar tu perfil",
          name: "Nombre",
          bio: "Biografía",
          location: "Ubicación",
          website: "Sitio web",
          saveChanges: "Guardar cambios",
          chooseTweetPlan: "Elige tu plan de tweets",
          perMonth: "/ mes",
          tweetsAllowed: "Tweets permitidos:",
          subscribeNow: "Suscríbete ahora"






        }
      },
      fr: {
        translation: {
          home: "Accueil",
          explore: "Explorer",
          notifications: "Notifications",
          messages: "Messages",
          bookmarks: "Signets",
          profile: "Profil",
          tweet: "Tweeter",
          subscribe: "S'abonner",
          changeLanguage: "Changer de langue",
          addAccount: "Ajouter un compte existant",
          logout: "Se déconnecter",
          welcome: "Bienvenue",
          whatsHappening: "Qu'est-ce qui se passe",
          post: "Publier",
          showPosts: "Voir les publications",
          loadingPosts: "Chargement des publications...",
          exploreUsers: "Explorer les utilisateurs",
          followers: "Abonnés:",
          following: "Suivant:",
          viewProfile: "Voir le profil",
          noUsersFound: "Aucun utilisateur trouvé.",
          follow: "Suivre",
          unfollow: "Ne plus suivre",
          editProfile: "Modifier le profil",
          joined: "📅 Rejoint",
          posts: "Publications",
          noPostsAvailable: "Aucune publication disponible",
          everyoneCanReply: "Tout le monde peut répondre",
          drafts: "Brouillons",
          requestOtpAudio: "Demander un OTP pour le téléchargement audio",
          posting: "Publication en cours...",
          editYourProfile: "Modifier votre profil",
          name: "Nom",
          bio: "Bio",
          location: "Emplacement",
          website: "Site Web",
          saveChanges: "Enregistrer les modifications",
          chooseTweetPlan: "Choisissez votre plan de tweets",
          perMonth: "/ mois",
          tweetsAllowed: "Tweets autorisés:",
          subscribeNow: "Abonnez-vous maintenant"




        }
      },
      pt: {
        translation: {
          home: "Início",
          explore: "Explorar",
          notifications: "Notificações",
          messages: "Mensagens",
          bookmarks: "Favoritos",
          profile: "Perfil",
          tweet: "Tuitar",
          subscribe: "Inscrever-se",
          changeLanguage: "Mudar idioma",
          addAccount: "Adicionar uma conta existente",
          logout: "Sair",
          welcome: "Bem-vindo",
          whatsHappening: "O que está acontecendo",
          post: "Postar",
          showPosts: "Mostrar postagens",
          loadingPosts: "Carregando postagens...",
          exploreUsers: "Explorar usuários",
          followers: "Seguidores:",
          following: "Seguindo:",
          viewProfile: "Ver perfil",
          noUsersFound: "Nenhum usuário encontrado.",
          follow: "Seguir",
          unfollow: "Deixar de seguir",
          editProfile: "Editar perfil",
          joined: "📅 Juntou-se",
          posts: "Postagens",
          noPostsAvailable: "Nenhuma postagem disponível",
          everyoneCanReply: "Todos podem responder",
          drafts: "Rascunhos",
          requestOtpAudio: "Solicitar OTP para upload de áudio",
          posting: "Publicando...",
          editYourProfile: "Editar seu perfil",
          name: "Nome",
          bio: "Bio",
          location: "Localização",
          website: "Site",
          saveChanges: "Salvar alterações",
          chooseTweetPlan: "Escolha seu plano de tweets",
          perMonth: "/ mês",
          tweetsAllowed: "Tweets permitidos:",
          subscribeNow: "Inscreva-se agora"






        }
      },
      zh: {
        translation: {
          home: "主页",
          explore: "探索",
          notifications: "通知",
          messages: "消息",
          bookmarks: "书签",
          profile: "个人资料",
          tweet: "推文",
          subscribe: "订阅",
          changeLanguage: "更改语言",
          addAccount: "添加现有帐户",
          logout: "登出",
          welcome: "欢迎",
          whatsHappening: "发生了什么",
          post: "发布",
          showPosts: "查看帖子",
          loadingPosts: "正在加载帖子...",
          exploreUsers: "探索用户",
          followers: "粉丝：",
          following: "正在关注：",
          viewProfile: "查看个人资料",
          noUsersFound: "没有找到用户。",
          follow: "关注",
          unfollow: "取消关注",
          editProfile: "编辑个人资料",
          joined: "📅 加入",
          posts: "帖子",
          noPostsAvailable: "没有帖子可用",
          everyoneCanReply: "所有人都可以回复",
          drafts: "草稿",
          requestOtpAudio: "请求上传音频的 OTP",
          posting: "正在发布...",
          editYourProfile: "编辑你的个人资料",
          name: "姓名",
          bio: "简介",
          location: "位置",
          website: "网站",
          saveChanges: "保存更改",
          chooseTweetPlan: "选择你的推文计划",
          perMonth: "/ 月",
          tweetsAllowed: "允许的推文数：",
          subscribeNow: "立即订阅"







        }
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
