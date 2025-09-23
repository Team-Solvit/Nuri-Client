import React, { useState, useRef, useEffect } from 'react';
import Square from '@/components/ui/button/square';
import { GroupService } from '@/services/group';
import { useAlertStore } from '@/store/alert';
import { useApolloClient } from '@apollo/client';
import { useFileUpload } from '@/hooks/useFileUpload';
import type { Group, GroupUpdateInput, Area } from '@/types/group';
import * as S from './style';

interface GroupEditModalProps {
  group: Group;
  onDone: () => void;
  onUpdated: (updatedGroup: Group) => void;
}

export default function GroupEditModal({ group, onDone, onUpdated }: GroupEditModalProps) {
  const { success, error } = useAlertStore();
  const client = useApolloClient();
  const { upload, loading: uploadLoading } = useFileUpload();

  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || '');
  const [maxParticipation, setMaxParticipation] = useState(group.maxParticipation);
  const [area, setArea] = useState(group.area.area);
  const [latitude, setLatitude] = useState(group.area.latitude);
  const [longitude, setLongitude] = useState(group.area.longitude);
  const [banner, setBanner] = useState(group.banner || '');
  const [profile, setProfile] = useState(group.profile || '');
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loadingAreas, setLoadingAreas] = useState(true);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const areaList = await GroupService.getAreas(client);
        setAreas(areaList);
      } catch (e) {
        error('지역 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoadingAreas(false);
      }
    };

    loadAreas();
  }, [client, error]);

  const handleImageUpload = async (files: File[], type: 'banner' | 'profile') => {
    try {
      const uploadedIds = await upload(files);
      if (uploadedIds && uploadedIds.length > 0) {
        if (type === 'banner') {
          setBanner(uploadedIds[0]);
        } else {
          setProfile(uploadedIds[0]);
        }
        success('이미지가 업로드되었습니다.');
      }
    } catch (e) {
      error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload([files[0]], 'banner');
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload([files[0]], 'profile');
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      error('모든 필드를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const input: GroupUpdateInput = {
        groupId: group.groupId,
        name,
        banner: banner || undefined,
        description,
        profile: profile || undefined,
        positionDto: {
          area,
          latitude,
          longitude
        },
        maxParticipation
      };

      await GroupService.updateGroup(client, input);

      const updatedGroup: Group = {
        ...group,
        name,
        description,
        banner,
        profile,
        maxParticipation,
        area: {
          area,
          latitude,
          longitude
        }
      };

      success('모임 정보가 수정되었습니다.');
      onUpdated(updatedGroup);
      onDone();
    } catch (e) {
      error('모임 정보 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Title>모임 정보 수정</S.Title>
      <S.FormCol>
        <div>
          <S.Label>배너 이미지</S.Label>
          {banner && (
            <S.BannerImg
              src={`https://cdn.solvit-nuri.com/file/${banner}`}
              alt="배너 미리보기"
            />
          )}
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            disabled={loading || uploadLoading}
            style={{ display: 'none' }}
          />
          <Square
            text={uploadLoading ? '업로드 중...' : '배너 이미지 변경'}
            onClick={() => bannerInputRef.current?.click()}
            status={!loading && !uploadLoading}
            width="100%"
          />
        </div>
        <div>
          <S.Label>프로필 이미지</S.Label>
          {profile && (
            <S.ProfileImg
              src={`https://cdn.solvit-nuri.com/file/${profile}`}
              alt="프로필 미리보기"
            />
          )}
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
            disabled={loading || uploadLoading}
            style={{ display: 'none' }}
          />
          <Square
            text={uploadLoading ? '업로드 중...' : '프로필 이미지 변경'}
            onClick={() => profileInputRef.current?.click()}
            status={!loading && !uploadLoading}
            width="100%"
          />
        </div>
        <div>
          <S.Label>모임 이름</S.Label>
          <S.TextInput
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
            placeholder="모임 이름을 입력해주세요"
          />
        </div>
        <div>
          <S.Label>모임 설명</S.Label>
          <S.TextArea
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
            placeholder="모임에 대한 설명을 입력해주세요"
          />
        </div>
        <div>
          <S.Label>지역</S.Label>
          {loadingAreas ? (
            <div style={{ padding: 12, textAlign: 'center', color: '#666' }}>
              지역 목록을 불러오는 중...
            </div>
          ) : (
            <S.Select
              value={area}
              onChange={e => {
                const selectedArea = areas.find(a => a.area === e.target.value);
                if (selectedArea) {
                  setArea(selectedArea.area);
                  setLatitude(selectedArea.latitude);
                  setLongitude(selectedArea.longitude);
                }
              }}
              disabled={loading}
            >
              <option value="">지역을 선택해주세요</option>
              {areas.map((areaItem) => (
                <option key={areaItem.area} value={areaItem.area}>
                  {areaItem.area}
                </option>
              ))}
            </S.Select>
          )}
          <S.CoordText>
            선택된 좌표: 위도 {latitude.toFixed(6)}, 경도 {longitude.toFixed(6)}
          </S.CoordText>
        </div>
        <div>
          <S.Label>최대 참여 인원</S.Label>
          <S.TextInput
            type="number"
            min="2"
            max="50"
            value={maxParticipation}
            onChange={e => setMaxParticipation(parseInt(e.target.value) || 2)}
            disabled={loading}
          />
        </div>
        <S.BtnRow>
          <Square
            text={loading ? '저장 중...' : '저장'}
            onClick={handleSave}
            status={!loading && !uploadLoading}
            width="100%"
          />
          <Square
            text="취소"
            onClick={onDone}
            status={!loading && !uploadLoading}
            width="100%"
          />
        </S.BtnRow>
      </S.FormCol>
    </S.Wrapper>
  );
}