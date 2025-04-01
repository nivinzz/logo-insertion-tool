document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageUpload = document.getElementById('imageUpload');
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoUpload = document.getElementById('logoUpload');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const logoPreview = document.getElementById('logoPreview');
    const previewButton = document.getElementById('previewButton');
    const previewImage = document.getElementById('previewImage');
    const processButton = document.getElementById('processButton');
    const progressBar = document.getElementById('progressBar');
    const progressStatus = document.getElementById('progressStatus');
    const resultModal = document.getElementById('resultModal');
    const resultImagesContainer = document.getElementById('resultImagesContainer');
    const downloadAllButton = document.getElementById('downloadAllButton');
    const closeModalBtn = document.querySelector('.close');
    
    // Language elements
    const currentLanguage = document.querySelector('.current-language');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Position options
    const positionSelect = document.getElementById('position');
    const marginInput = document.getElementById('margin');
    const usePercentageRadio = document.getElementById('usePercentage');
    const useFixedSizeRadio = document.getElementById('useFixedSize');
    const percentageGroup = document.getElementById('percentageGroup');
    const fixedSizeGroup = document.getElementById('fixedSizeGroup');
    const sizePercentInput = document.getElementById('sizePercent');
    const fixedWidthInput = document.getElementById('fixedWidth');
    const fixedHeightInput = document.getElementById('fixedHeight');
    const opacityInput = document.getElementById('opacity');
    
    // Storage for uploaded images and logo
    let uploadedImages = [];
    let uploadedLogo = null;
    let processedImages = [];
    
    // Language translations
    const translations = {
        'vi': {
            'title': 'Công Cụ Chèn Logo',
            'upload_images': 'Tải lên hình ảnh và logo',
            'drop_images': 'Kéo thả hoặc nhấp để tải lên hình ảnh',
            'drop_logo': 'Kéo thả hoặc nhấp để tải lên logo',
            'logo_settings': 'Cài đặt logo',
            'position': 'Vị trí',
            'position_top_left': 'Góc trên bên trái',
            'position_top_right': 'Góc trên bên phải',
            'position_top_center': 'Góc trên ở giữa',
            'position_bottom_left': 'Góc dưới bên trái',
            'position_bottom_right': 'Góc dưới bên phải',
            'position_bottom_center': 'Góc dưới ở giữa',
            'position_center': 'Trung tâm',
            'margin': 'Khoảng cách viền (pixel)',
            'use_percentage': 'Tỷ lệ theo % ảnh gốc',
            'use_fixed_size': 'Kích thước cố định (pixel)',
            'size_percent': 'Kích thước logo (%)',
            'width': 'Chiều rộng (pixel)',
            'height': 'Chiều cao (pixel)',
            'opacity': 'Độ trong suốt (%)',
            'preview': 'Xem trước',
            'process_all': 'Xử lý tất cả hình ảnh',
            'ready': 'Sẵn sàng',
            'download_images': 'Tải xuống hình ảnh',
            'download_all': 'Tải xuống tất cả',
            'download': 'Tải xuống',
            'processing': 'Đang xử lý',
            'of': '/',
            'images': 'hình ảnh',
            'completed': 'Đã hoàn thành xử lý',
            'error': 'Lỗi xử lý!',
            'alert_upload_logo': 'Vui lòng tải lên logo trước!',
            'alert_upload_image': 'Vui lòng tải lên ít nhất một hình ảnh!',
            'alert_image_only': 'Chỉ hỗ trợ file hình ảnh!',
            'creating_zip': 'Đang tạo ZIP...'
        },
        'en': {
            'title': 'Logo Insertion Tool',
            'upload_images': 'Upload images and logo',
            'drop_images': 'Drag and drop or click to upload images',
            'drop_logo': 'Drag and drop or click to upload logo',
            'logo_settings': 'Logo settings',
            'position': 'Position',
            'position_top_left': 'Top left',
            'position_top_right': 'Top right',
            'position_top_center': 'Top center',
            'position_bottom_left': 'Bottom left',
            'position_bottom_right': 'Bottom right',
            'position_bottom_center': 'Bottom center',
            'position_center': 'Center',
            'margin': 'Margin (pixels)',
            'use_percentage': 'Percentage of original image',
            'use_fixed_size': 'Fixed size (pixels)',
            'size_percent': 'Logo size (%)',
            'width': 'Width (pixels)',
            'height': 'Height (pixels)',
            'opacity': 'Opacity (%)',
            'preview': 'Preview',
            'process_all': 'Process all images',
            'ready': 'Ready',
            'download_images': 'Download images',
            'download_all': 'Download all',
            'download': 'Download',
            'processing': 'Processing',
            'of': '/',
            'images': 'images',
            'completed': 'Completed processing',
            'error': 'Error processing!',
            'alert_upload_logo': 'Please upload a logo first!',
            'alert_upload_image': 'Please upload at least one image!',
            'alert_image_only': 'Only image files are supported!',
            'creating_zip': 'Creating ZIP...'
        },
        'zh': {
            'title': '标志插入工具',
            'upload_images': '上传图像和标志',
            'drop_images': '拖放或点击上传图像',
            'drop_logo': '拖放或点击上传标志',
            'logo_settings': '标志设置',
            'position': '位置',
            'position_top_left': '左上角',
            'position_top_right': '右上角',
            'position_top_center': '顶部中心',
            'position_bottom_left': '左下角',
            'position_bottom_right': '右下角',
            'position_bottom_center': '底部中心',
            'position_center': '中心',
            'margin': '边距（像素）',
            'use_percentage': '原始图像的百分比',
            'use_fixed_size': '固定大小（像素）',
            'size_percent': '标志大小（%）',
            'width': '宽度（像素）',
            'height': '高度（像素）',
            'opacity': '不透明度（%）',
            'preview': '预览',
            'process_all': '处理所有图像',
            'ready': '准备就绪',
            'download_images': '下载图像',
            'download_all': '全部下载',
            'download': '下载',
            'processing': '处理中',
            'of': '/',
            'images': '图像',
            'completed': '处理完成',
            'error': '处理错误！',
            'alert_upload_logo': '请先上传标志！',
            'alert_upload_image': '请至少上传一张图像！',
            'alert_image_only': '仅支持图像文件！',
            'creating_zip': '正在创建ZIP...'
        },
        'fr': {
            'title': 'Outil d\'insertion de logo',
            'upload_images': 'Télécharger des images et logo',
            'drop_images': 'Glisser-déposer ou cliquer pour télécharger des images',
            'drop_logo': 'Glisser-déposer ou cliquer pour télécharger un logo',
            'logo_settings': 'Paramètres du logo',
            'position': 'Position',
            'position_top_left': 'En haut à gauche',
            'position_top_right': 'En haut à droite',
            'position_top_center': 'En haut au centre',
            'position_bottom_left': 'En bas à gauche',
            'position_bottom_right': 'En bas à droite',
            'position_bottom_center': 'En bas au centre',
            'position_center': 'Centre',
            'margin': 'Marge (pixels)',
            'use_percentage': 'Pourcentage de l\'image originale',
            'use_fixed_size': 'Taille fixe (pixels)',
            'size_percent': 'Taille du logo (%)',
            'width': 'Largeur (pixels)',
            'height': 'Hauteur (pixels)',
            'opacity': 'Opacité (%)',
            'preview': 'Aperçu',
            'process_all': 'Traiter toutes les images',
            'ready': 'Prêt',
            'download_images': 'Télécharger les images',
            'download_all': 'Tout télécharger',
            'download': 'Télécharger',
            'processing': 'Traitement',
            'of': '/',
            'images': 'images',
            'completed': 'Traitement terminé',
            'error': 'Erreur de traitement!',
            'alert_upload_logo': 'Veuillez d\'abord télécharger un logo!',
            'alert_upload_image': 'Veuillez télécharger au moins une image!',
            'alert_image_only': 'Seuls les fichiers image sont pris en charge!',
            'creating_zip': 'Création du ZIP...'
        },
        'es': {
            'title': 'Herramienta de inserción de logotipo',
            'upload_images': 'Subir imágenes y logotipo',
            'drop_images': 'Arrastrar y soltar o hacer clic para subir imágenes',
            'drop_logo': 'Arrastrar y soltar o hacer clic para subir logotipo',
            'logo_settings': 'Configuración del logotipo',
            'position': 'Posición',
            'position_top_left': 'Arriba a la izquierda',
            'position_top_right': 'Arriba a la derecha',
            'position_top_center': 'Arriba en el centro',
            'position_bottom_left': 'Abajo a la izquierda',
            'position_bottom_right': 'Abajo a la derecha',
            'position_bottom_center': 'Abajo en el centro',
            'position_center': 'Centro',
            'margin': 'Margen (píxeles)',
            'use_percentage': 'Porcentaje de la imagen original',
            'use_fixed_size': 'Tamaño fijo (píxeles)',
            'size_percent': 'Tamaño del logotipo (%)',
            'width': 'Ancho (píxeles)',
            'height': 'Alto (píxeles)',
            'opacity': 'Opacidad (%)',
            'preview': 'Vista previa',
            'process_all': 'Procesar todas las imágenes',
            'ready': 'Listo',
            'download_images': 'Descargar imágenes',
            'download_all': 'Descargar todo',
            'download': 'Descargar',
            'processing': 'Procesando',
            'of': '/',
            'images': 'imágenes',
            'completed': 'Procesamiento completado',
            'error': '¡Error de procesamiento!',
            'alert_upload_logo': '¡Por favor, suba un logotipo primero!',
            'alert_upload_image': '¡Por favor, suba al menos una imagen!',
            'alert_image_only': '¡Solo se admiten archivos de imagen!',
            'creating_zip': 'Creando ZIP...'
        },
        'ja': {
            'title': 'ロゴ挿入ツール',
            'upload_images': '画像とロゴをアップロード',
            'drop_images': 'ドラッグ＆ドロップまたはクリックして画像をアップロード',
            'drop_logo': 'ドラッグ＆ドロップまたはクリックしてロゴをアップロード',
            'logo_settings': 'ロゴ設定',
            'position': '位置',
            'position_top_left': '左上',
            'position_top_right': '右上',
            'position_top_center': '上部中央',
            'position_bottom_left': '左下',
            'position_bottom_right': '右下',
            'position_bottom_center': '下部中央',
            'position_center': '中央',
            'margin': 'マージン（ピクセル）',
            'use_percentage': '元の画像の割合',
            'use_fixed_size': '固定サイズ（ピクセル）',
            'size_percent': 'ロゴサイズ（%）',
            'width': '幅（ピクセル）',
            'height': '高さ（ピクセル）',
            'opacity': '不透明度（%）',
            'preview': 'プレビュー',
            'process_all': 'すべての画像を処理',
            'ready': '準備完了',
            'download_images': '画像をダウンロード',
            'download_all': 'すべてダウンロード',
            'download': 'ダウンロード',
            'processing': '処理中',
            'of': '/',
            'images': '画像',
            'completed': '処理完了',
            'error': '処理エラー！',
            'alert_upload_logo': '最初にロゴをアップロードしてください！',
            'alert_upload_image': '少なくとも1つの画像をアップロードしてください！',
            'alert_image_only': '画像ファイルのみサポートされています！',
            'creating_zip': 'ZIPを作成中...'
        }
    };
    
    // Current language
    let currentLang = 'vi';
    
    // Initialize
    function init() {
        setupEventListeners();
        loadDefaultLogo();
        setupLanguageSelector();
    }
    
    // Setup language selector functionality
    function setupLanguageSelector() {
        // Toggle language dropdown
        currentLanguage.addEventListener('click', function() {
            if (languageDropdown.style.display === 'block') {
                languageDropdown.style.display = 'none';
            } else {
                languageDropdown.style.display = 'block';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!currentLanguage.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.style.display = 'none';
            }
        });
        
        // Language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const flagSrc = this.querySelector('img').src;
                const langText = this.querySelector('span').textContent;
                
                // Update current language display
                currentLanguage.querySelector('img').src = flagSrc;
                currentLanguage.querySelector('span').textContent = langText;
                
                // Update the UI language
                changeLanguage(lang);
                
                // Close dropdown
                languageDropdown.style.display = 'none';
            });
        });
    }
    
    // Change language function
    function changeLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language ${lang} not supported`);
            return;
        }
        
        currentLang = lang;
        const text = translations[lang];
        
        // Update document title
        document.title = text.title;
        
        // Update header
        document.querySelector('header h1').textContent = text.title;
        
        // Update sections
        document.querySelector('.upload-section h2').textContent = text.upload_images;
        document.querySelector('.settings-section h2').textContent = text.logo_settings;
        document.querySelector('.preview-section h2').textContent = text.preview;
        
        // Update upload areas
        document.querySelector('#imageUploadArea p').textContent = text.drop_images;
        document.querySelector('#logoUploadArea p').textContent = text.drop_logo;
        
        // Update settings
        document.querySelector('label[for="position"]').textContent = text.position + ':';
        document.querySelector('#position option[value="top-left"]').textContent = text.position_top_left;
        document.querySelector('#position option[value="top-right"]').textContent = text.position_top_right;
        document.querySelector('#position option[value="top-center"]').textContent = text.position_top_center;
        document.querySelector('#position option[value="bottom-left"]').textContent = text.position_bottom_left;
        document.querySelector('#position option[value="bottom-right"]').textContent = text.position_bottom_right;
        document.querySelector('#position option[value="bottom-center"]').textContent = text.position_bottom_center;
        document.querySelector('#position option[value="center"]').textContent = text.position_center;
        
        document.querySelector('label[for="margin"]').textContent = text.margin + ':';
        document.querySelector('label[for="usePercentage"]').textContent = text.use_percentage;
        document.querySelector('label[for="useFixedSize"]').textContent = text.use_fixed_size;
        document.querySelector('label[for="sizePercent"]').textContent = text.size_percent + ':';
        document.querySelector('label[for="fixedWidth"]').textContent = text.width + ':';
        document.querySelector('label[for="fixedHeight"]').textContent = text.height + ':';
        document.querySelector('label[for="opacity"]').textContent = text.opacity + ':';
        
        // Update buttons
        document.querySelector('#previewButton').textContent = text.preview;
        document.querySelector('#processButton').textContent = text.process_all;
        document.querySelector('#progressStatus').textContent = text.ready;
        
        // Update modal
        document.querySelector('#resultModal .modal-content h2').textContent = text.download_images;
        document.querySelector('#downloadAllButton').textContent = text.download_all;
        
        // Update any download links that exist
        document.querySelectorAll('.result-item a').forEach(link => {
            link.textContent = text.download;
        });
    }
    
    // Load default logo
    function loadDefaultLogo() {
        const defaultLogoPath = 'images/logoweb.png';
        
        fetch(defaultLogoPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Default logo not found');
                }
                return response.blob();
            })
            .then(blob => {
                const file = new File([blob], 'logoweb.png', { type: 'image/png' });
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const img = new Image();
                    img.src = e.target.result;
                    
                    img.onload = function() {
                        uploadedLogo = {
                            file: file,
                            dataUrl: e.target.result,
                            width: img.width,
                            height: img.height
                        };
                        
                        // Update logo preview
                        logoPreview.innerHTML = '';
                        const previewImg = document.createElement('img');
                        previewImg.src = e.target.result;
                        logoPreview.appendChild(previewImg);
                    };
                };
                
                reader.readAsDataURL(file);
            })
            .catch(error => {
                console.error('Error loading default logo:', error);
            });
    }
    
    // Event Listeners
    function setupEventListeners() {
        // File upload handling
        imageUploadArea.addEventListener('click', () => imageUpload.click());
        logoUploadArea.addEventListener('click', () => logoUpload.click());
        
        imageUpload.addEventListener('change', handleImageUpload);
        logoUpload.addEventListener('change', handleLogoUpload);
        
        // Drag and drop for images
        setupDragDrop(imageUploadArea, handleImageUpload);
        setupDragDrop(logoUploadArea, handleLogoUpload);
        
        // Size type toggle
        usePercentageRadio.addEventListener('change', toggleSizeOptions);
        useFixedSizeRadio.addEventListener('change', toggleSizeOptions);
        
        // Preview and processing
        previewButton.addEventListener('click', previewLogoInsertion);
        processButton.addEventListener('click', processAllImages);
        
        // Modal handling
        closeModalBtn.addEventListener('click', () => {
            resultModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === resultModal) {
                resultModal.style.display = 'none';
            }
        });
        
        // Download all button
        downloadAllButton.addEventListener('click', downloadAllImages);
    }
    
    // Toggle size options based on selected radio button
    function toggleSizeOptions() {
        if (usePercentageRadio.checked) {
            percentageGroup.style.display = 'block';
            fixedSizeGroup.style.display = 'none';
        } else {
            percentageGroup.style.display = 'none';
            fixedSizeGroup.style.display = 'block';
        }
    }
    
    // Setup drag and drop functionality
    function setupDragDrop(dropArea, handleFn) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('highlight');
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('highlight');
            }, false);
        });
        
        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                if (dropArea === logoUploadArea) {
                    // Fix for logo upload - use first file only
                    const fileArray = Array.from(files);
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(fileArray[0]);
                    logoUpload.files = dataTransfer.files;
                    
                    // Trigger the change event manually
                    const event = new Event('change', { bubbles: true });
                    logoUpload.dispatchEvent(event);
                } else {
                    imageUpload.files = files;
                    handleFn(e);
                }
            }
        }, false);
    }
    
    // Handle image upload
    function handleImageUpload(e) {
        const files = e.target.files || e.dataTransfer.files;
        
        if (!files.length) return;
        
        // Clear previous preview if new files are selected
        if (e.target === imageUpload && imageUpload.files.length > 0) {
            imagePreviewContainer.innerHTML = '';
            uploadedImages = [];
        }
        
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) {
                alert(translations[currentLang].alert_image_only);
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = new Image();
                img.src = e.target.result;
                
                img.onload = function() {
                    uploadedImages.push({
                        file: file,
                        dataUrl: e.target.result,
                        width: img.width,
                        height: img.height
                    });
                    
                    // Create preview item
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    const previewImg = document.createElement('img');
                    previewImg.src = e.target.result;
                    previewItem.appendChild(previewImg);
                    
                    // Add remove button
                    const removeBtn = document.createElement('div');
                    removeBtn.className = 'remove-btn';
                    removeBtn.innerHTML = 'x';
                    removeBtn.addEventListener('click', function() {
                        const index = uploadedImages.findIndex(img => img.dataUrl === e.target.result);
                        if (index !== -1) {
                            uploadedImages.splice(index, 1);
                            previewItem.remove();
                        }
                    });
                    
                    previewItem.appendChild(removeBtn);
                    imagePreviewContainer.appendChild(previewItem);
                };
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // Handle logo upload
    function handleLogoUpload(e) {
        const file = e.target.files[0] || (e.dataTransfer && e.dataTransfer.files[0]);
        
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            alert(translations[currentLang].alert_image_only);
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                uploadedLogo = {
                    file: file,
                    dataUrl: e.target.result,
                    width: img.width,
                    height: img.height
                };
                
                // Update logo preview
                logoPreview.innerHTML = '';
                const previewImg = document.createElement('img');
                previewImg.src = e.target.result;
                logoPreview.appendChild(previewImg);
            };
        };
        
        reader.readAsDataURL(file);
    }
    
    // Preview logo insertion
    function previewLogoInsertion() {
        if (!uploadedLogo) {
            alert(translations[currentLang].alert_upload_logo);
            return;
        }
        
        if (uploadedImages.length === 0) {
            alert(translations[currentLang].alert_upload_image);
            return;
        }
        
        const position = positionSelect.value;
        const margin = parseInt(marginInput.value);
        const opacity = parseInt(opacityInput.value);
        const useFixedSize = useFixedSizeRadio.checked;
        const sizePercent = parseInt(sizePercentInput.value);
        const fixedWidth = parseInt(fixedWidthInput.value);
        const fixedHeight = parseInt(fixedHeightInput.value);
        
        // Use the first image for preview
        const baseImage = uploadedImages[0];
        
        // Apply logo to the image
        const result = applyLogoToImage(
            baseImage, 
            uploadedLogo, 
            position, 
            margin, 
            useFixedSize, 
            sizePercent, 
            fixedWidth, 
            fixedHeight, 
            opacity
        );
        
        // Update preview
        previewImage.innerHTML = '';
        const previewImg = document.createElement('img');
        previewImg.src = result;
        
        // Make sure image fits the preview area
        previewImg.onload = function() {
            const previewBox = document.querySelector('.preview-box');
            const maxWidth = previewBox.clientWidth - 40; // accounting for padding
            const maxHeight = previewBox.clientHeight - 40;
            
            // Calculate the aspect ratio
            const imageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
            
            if (previewImg.naturalWidth > maxWidth || previewImg.naturalHeight > maxHeight) {
                // Determine which dimension is limiting
                if (maxWidth / imageRatio <= maxHeight) {
                    // Width is limiting
                    previewImg.style.width = '100%';
                    previewImg.style.height = 'auto';
                } else {
                    // Height is limiting
                    previewImg.style.height = '100%';
                    previewImg.style.width = 'auto';
                }
            }
        };
        
        previewImage.appendChild(previewImg);
    }
    
    // Process all images
    function processAllImages() {
        if (!uploadedLogo) {
            alert(translations[currentLang].alert_upload_logo);
            return;
        }
        
        if (uploadedImages.length === 0) {
            alert(translations[currentLang].alert_upload_image);
            return;
        }
        
        const position = positionSelect.value;
        const margin = parseInt(marginInput.value);
        const opacity = parseInt(opacityInput.value);
        const useFixedSize = useFixedSizeRadio.checked;
        const sizePercent = parseInt(sizePercentInput.value);
        const fixedWidth = parseInt(fixedWidthInput.value);
        const fixedHeight = parseInt(fixedHeightInput.value);
        
        // Reset progress
        processedImages = [];
        progressBar.style.width = '0%';
        progressStatus.textContent = `${translations[currentLang].processing} 0 ${translations[currentLang].of} ${uploadedImages.length} ${translations[currentLang].images}`;
        
        // Process each image asynchronously
        let processed = 0;
        
        uploadedImages.forEach((image, index) => {
            // Use setTimeout to avoid blocking the UI
            setTimeout(() => {
                try {
                    // Process image at full quality
                    const result = applyLogoToImage(
                        image, 
                        uploadedLogo, 
                        position, 
                        margin, 
                        useFixedSize, 
                        sizePercent, 
                        fixedWidth, 
                        fixedHeight, 
                        opacity
                    );
                    
                    // Store original file information to maintain quality
                    processedImages.push({
                        original: image,
                        dataUrl: result,
                        name: image.file.name,
                        type: image.file.type
                    });
                    
                    processed++;
                    
                    // Update progress
                    const progress = (processed / uploadedImages.length) * 100;
                    progressBar.style.width = `${progress}%`;
                    progressStatus.textContent = `${translations[currentLang].processing} ${processed} ${translations[currentLang].of} ${uploadedImages.length} ${translations[currentLang].images}`;
                    
                    // When all images are processed
                    if (processed === uploadedImages.length) {
                        processingCompleted();
                    }
                } catch (error) {
                    console.error('Error processing image:', error);
                    processed++;
                    
                    // Update progress even on error
                    const progress = (processed / uploadedImages.length) * 100;
                    progressBar.style.width = `${progress}%`;
                    progressStatus.textContent = `${translations[currentLang].error} ${processed} ${translations[currentLang].of} ${uploadedImages.length} ${translations[currentLang].images}`;
                    
                    if (processed === uploadedImages.length) {
                        processingCompleted();
                    }
                }
            }, index * 100); // Stagger processing to avoid UI lock
        });
    }
    
    // Apply logo to an image
    function applyLogoToImage(baseImage, logoImage, position, margin, useFixedSize, sizePercent, fixedWidth, fixedHeight, opacity) {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match the original image
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        
        // Draw base image at full quality
        const baseImg = new Image();
        baseImg.src = baseImage.dataUrl;
        ctx.drawImage(baseImg, 0, 0, baseImage.width, baseImage.height);
        
        // Calculate logo size
        let logoWidth, logoHeight;
        
        if (useFixedSize) {
            logoWidth = fixedWidth;
            logoHeight = fixedHeight;
        } else {
            logoWidth = Math.floor(baseImage.width * (sizePercent / 100));
            const logoRatio = logoImage.width / logoImage.height;
            logoHeight = Math.floor(logoWidth / logoRatio);
        }
        
        // Create a temporary canvas for the logo with opacity
        const logoCanvas = document.createElement('canvas');
        logoCanvas.width = logoWidth;
        logoCanvas.height = logoHeight;
        const logoCtx = logoCanvas.getContext('2d');
        
        // Enable image smoothing for better quality
        logoCtx.imageSmoothingEnabled = true;
        logoCtx.imageSmoothingQuality = 'high';
        
        // Draw logo with opacity
        const logo = new Image();
        logo.src = logoImage.dataUrl;
        logoCtx.globalAlpha = opacity / 100;
        logoCtx.drawImage(logo, 0, 0, logoWidth, logoHeight);
        
        // Calculate position
        let x, y;
        
        switch(position) {
            case 'top-left':
                x = margin;
                y = margin;
                break;
            case 'top-right':
                x = baseImage.width - logoWidth - margin;
                y = margin;
                break;
            case 'top-center':
                x = (baseImage.width - logoWidth) / 2;
                y = margin;
                break;
            case 'bottom-left':
                x = margin;
                y = baseImage.height - logoHeight - margin;
                break;
            case 'bottom-right':
                x = baseImage.width - logoWidth - margin;
                y = baseImage.height - logoHeight - margin;
                break;
            case 'bottom-center':
                x = (baseImage.width - logoWidth) / 2;
                y = baseImage.height - logoHeight - margin;
                break;
            case 'center':
                x = (baseImage.width - logoWidth) / 2;
                y = (baseImage.height - logoHeight) / 2;
                break;
            default:
                x = baseImage.width - logoWidth - margin;
                y = baseImage.height - logoHeight - margin;
        }
        
        // Enable image smoothing for the main canvas too
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw logo onto main canvas
        ctx.drawImage(logoCanvas, x, y);
        
        // Return as data URL with highest possible quality
        // Use the original image's MIME type to maintain format
        const mimeType = baseImage.file.type;
        // If it's a JPEG, use high quality (0.95 out of 1), otherwise use default
        const quality = mimeType === 'image/jpeg' ? 0.95 : undefined;
        
        return canvas.toDataURL(mimeType, quality);
    }
    
    // Processing completed
    function processingCompleted() {
        progressStatus.textContent = `${translations[currentLang].completed} ${processedImages.length} ${translations[currentLang].of} ${uploadedImages.length} ${translations[currentLang].images}`;
        
        // Populate result modal
        populateResultModal();
        
        // Show modal
        resultModal.style.display = 'block';
    }
    
    // Populate result modal with processed images
    function populateResultModal() {
        resultImagesContainer.innerHTML = '';
        
        processedImages.forEach(image => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            const resultImg = document.createElement('img');
            resultImg.src = image.dataUrl;
            
            // Add a container for the image with proper sizing
            const imgContainer = document.createElement('div');
            imgContainer.className = 'result-img-container';
            imgContainer.appendChild(resultImg);
            resultItem.appendChild(imgContainer);
            
            const downloadLink = document.createElement('a');
            downloadLink.textContent = translations[currentLang].download;
            downloadLink.href = image.dataUrl;
            downloadLink.download = image.name;
            resultItem.appendChild(downloadLink);
            
            resultImagesContainer.appendChild(resultItem);
        });
    }
    
    // Download all processed images
    function downloadAllImages() {
        if (processedImages.length === 0) {
            return;
        }
        
        // Show loading message
        const originalButtonText = downloadAllButton.textContent;
        downloadAllButton.textContent = translations[currentLang].creating_zip || 'Đang tạo ZIP...';
        downloadAllButton.disabled = true;
        
        // Create a new ZIP file
        const zip = new JSZip();
        const imgFolder = zip.folder("processed_images");
        let count = 0;
        
        // Add each image to the ZIP file
        processedImages.forEach((image, index) => {
            // Get image data without the data URL prefix
            const imageData = image.dataUrl.split(',')[1];
            // Prepare filename with "_logo" suffix
            const fileName = getFileNameWithSuffix(image.name, '_logo');
            
            // Add the image to the ZIP file
            imgFolder.file(fileName, imageData, {base64: true});
            
            count++;
            // When all images are added to the ZIP file
            if (count === processedImages.length) {
                // Generate the ZIP file
                zip.generateAsync({type:"blob"})
                .then(function(content) {
                    // Get current date for filename
                    const now = new Date();
                    const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}`;
                    
                    // Create filename for the ZIP
                    const zipFileName = `processed_images_${dateStr}.zip`;
                    
                    // Download the ZIP file
                    saveAs(content, zipFileName);
                    
                    // Reset button
                    downloadAllButton.textContent = originalButtonText;
                    downloadAllButton.disabled = false;
                });
            }
        });
    }
    
    // Helper function to add suffix to filename before extension
    function getFileNameWithSuffix(filename, suffix) {
        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === -1) {
            // No extension found
            return filename + suffix;
        }
        
        const nameWithoutExt = filename.substring(0, lastDotIndex);
        const extension = filename.substring(lastDotIndex);
        return nameWithoutExt + suffix + extension;
    }
    
    // Initialize the app
    init();
}); 
